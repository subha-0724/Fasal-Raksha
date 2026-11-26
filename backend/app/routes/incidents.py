
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.deps import get_db, get_current_user
from app.models.user import User
from app.schemas.incident import IncidentCreate, IncidentResponse
from app.services.incident_service import create_incident

router = APIRouter(
    prefix="/incidents",
    tags=["Incidents"],
)


@router.post(
    "/",
    response_model=IncidentResponse,
    status_code=status.HTTP_201_CREATED,
)
def report_incident(
    incident_data: IncidentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    if current_user.role.value != "farmer":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only farmers can report incidents",
        )

    return create_incident(
        db=db,
        incident_data=incident_data,
        current_user=current_user,
    )
