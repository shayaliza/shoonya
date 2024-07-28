from fastapi import FastAPI, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy.future import select
from pydantic import BaseModel
from typing import Optional, List
from datetime import date
from db import Booking, SessionLocal, Retreat
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import asc, desc, cast, func
from sqlalchemy.types import Integer

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class BookingCreate(BaseModel):
    user_id: int
    user_name: str
    user_email: str
    user_phone: Optional[str] = None
    retreat_id: int
    retreat_title: Optional[str] = None
    retreat_location: Optional[str] = None
    retreat_price: Optional[float] = None
    retreat_duration: Optional[str] = None
    payment_details: Optional[str] = None
    booking_date: date

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# @app.post("/bookings/")
@app.post("/bookings/")
async def create_booking(booking: BookingCreate, db: Session = Depends(get_db)):
    # Check if the user already booked this retreat
    existing_booking = db.query(Booking).filter(
        Booking.user_email == booking.user_email,
        Booking.retreat_id == booking.retreat_id
    ).first()
    
    if existing_booking:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You have already booked this retreat."
        )
    
    # If not, create the new booking
    new_booking = Booking(
        user_id=booking.user_id,
        user_name=booking.user_name,
        user_email=booking.user_email,
        user_phone=booking.user_phone,
        retreat_id=booking.retreat_id,
        retreat_title=booking.retreat_title,
        retreat_location=booking.retreat_location,
        retreat_price=booking.retreat_price,
        retreat_duration=booking.retreat_duration,
        payment_details=booking.payment_details,
        booking_date=booking.booking_date,
    )
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    return new_booking


@app.get("/retreats/")
async def get_retreats(
    sort_by: Optional[str] = Query("date_asc", enum=["date_asc", "date_desc", "location", "duration"]),
    location_filter: Optional[str] = Query(None),
    duration_filter: Optional[int] = Query(None),
    db: Session = Depends(get_db)
):
    query = select(Retreat)
    
    if location_filter:
        query = query.filter(Retreat.location == location_filter)
    
    if duration_filter:
        query = query.filter(cast(Retreat.duration, Integer) == duration_filter)
    
    if sort_by == "date_asc":
        query = query.order_by(asc(Retreat.date))
    elif sort_by == "date_desc":
        query = query.order_by(desc(Retreat.date))
    elif sort_by == "location":
        query = query.order_by(Retreat.location)
    elif sort_by == "duration":
        query = query.order_by(Retreat.duration)
    
    result = db.execute(query)
    retreats = result.scalars().all()
    return retreats

@app.get("/retreats/search/")
async def search_retreats(
    title: Optional[str] = Query(None),
    sort_by: Optional[str] = Query("date_asc", enum=["date_asc", "date_desc", "location", "duration"]),
    location_filter: Optional[str] = Query(None),
    duration_filter: Optional[int] = Query(None),
    page: int = 1,
    page_size: int = 10,
    db: Session = Depends(get_db)
):
    query = select(Retreat)
    
    if title:
        query = query.filter(Retreat.title.ilike(f"%{title}%"))
    
    if location_filter:
        query = query.filter(Retreat.location == location_filter)
    
    if duration_filter:
        query = query.filter(cast(Retreat.duration, Integer) == duration_filter)
    
    if sort_by == "date_asc":
        query = query.order_by(asc(Retreat.date))
    elif sort_by == "date_desc":
        query = query.order_by(desc(Retreat.date))
    elif sort_by == "location":
        query = query.order_by(Retreat.location)
    elif sort_by == "duration":
        query = query.order_by(Retreat.duration)
    
    total_query = select(func.count()).select_from(query.subquery())
    total_count = db.execute(total_query).scalar()
    
    query = query.offset((page - 1) * page_size).limit(page_size)
    result = db.execute(query)
    retreats = result.scalars().all()
    
    if not retreats:
        raise HTTPException(status_code=404, detail="No retreats found matching the criteria")
    
    return {
        "total_count": total_count,
        "page": page,
        "page_size": page_size,
        "retreats": retreats
    }

@app.get("/")
async def root():
    return {"message": "Hello World"}
