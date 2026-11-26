
from sqlalchemy.orm import Session

from app.models.incident import Incident
from app.models.user import User
from app.schemas.incident import IncidentCreate


def create_incident(
    db: Session,
    incident_data: IncidentCreate,
    current_user: User,
) -> Incident:
    incident = Incident(
        farmer_id=current_user.id,
        damage_type=incident_data.damage_type,
        description=incident_data.description,
        village=incident_data.village,
        district=incident_data.district,
        state=incident_data.state,
        latitude=incident_data.latitude,
        longitude=incident_data.longitude,
        incident_date=incident_data.incident_date,
    )

    db.add(incident)
    db.commit()
    db.refresh(incident)

    return incident
