
from sqlalchemy import Boolean, Column, DateTime, Enum, Integer, String
from sqlalchemy.sql import func
import enum

from app.db.database import Base


class UserRole(str, enum.Enum):
    FARMER = "farmer"
    AGRICULTURE_OFFICER = "agriculture_officer"
    FOREST_OFFICER = "forest_officer"
    ADMIN = "admin"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    phone = Column(String(15), unique=True, nullable=True)
    hashed_password = Column(String(255), nullable=False)

    role = Column(
        Enum(UserRole),
        nullable=False,
        default=UserRole.FARMER,
    )

    is_active = Column(Boolean, default=True, nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )
