
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field

from app.models.incident import DamageType, IncidentStatus


class IncidentCreate(BaseModel):
    damage_type: DamageType
    description: str = Field(min_length=10, max_length=2000)

    village: str = Field(min_length=2, max_length=100)
    district: str = Field(min_length=2, max_length=100)
    state: str = Field(min_length=2, max_length=100)

    latitude: float | None = None
    longitude: float | None = None

    incident_date: datetime


class IncidentResponse(BaseModel):
    id: int
    farmer_id: int
    damage_type: DamageType
    description: str

    village: str
    district: str
    state: str

    latitude: float | None
    longitude: float | None

    status: IncidentStatus
    incident_date: datetime
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
