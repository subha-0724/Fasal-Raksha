
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import hash_password, verify_password


def register_user(db: Session, user_data: UserCreate) -> User:
    # Check whether the email already exists
    existing_user = db.query(User).filter(
        User.email == user_data.email
    ).first()

    if existing_user:
        raise ValueError("Email already registered")

    # Check whether the phone number already exists
    if user_data.phone:
        existing_phone = db.query(User).filter(
            User.phone == user_data.phone
        ).first()

        if existing_phone:
            raise ValueError("Phone number already registered")

    # Hash the password before saving
    user = User(
        full_name=user_data.full_name,
        email=user_data.email,
        phone=user_data.phone,
        hashed_password=hash_password(user_data.password),
        role=user_data.role,
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return user


def authenticate_user(
    db: Session,
    email: str,
    password: str,
):
    user = db.query(User).filter(User.email == email).first()

    if not user:
        return None

    if not verify_password(password, user.hashed_password):
        return None

    if not user.is_active:
        return None

    return user
