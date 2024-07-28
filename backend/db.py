from sqlalchemy import ForeignKeyConstraint, create_engine, Column, Integer, String, Text, Date, Numeric
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "postgresql+psycopg2://postgres:toor@localhost:5432/lotte"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class Retreat(Base):
    __tablename__ = "retreats"

    retreat_id = Column(Integer, primary_key=True, index=True)
    image = Column(Text)
    title = Column(String(255))
    description = Column(Text)
    duration = Column(String(50))
    date = Column(Date)
    location = Column(String(255))
    price = Column(Numeric(10, 2))

class Booking(Base):
    __tablename__ = "bookings"

    booking_id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    user_name = Column(String(255), nullable=False)
    user_email = Column(String(255), nullable=False)
    user_phone = Column(String(20))
    retreat_id = Column(Integer, nullable=False)
    retreat_title = Column(String(255))
    retreat_location = Column(String(255))
    retreat_price = Column(Numeric(10, 2))
    retreat_duration = Column(String(50))
    payment_details = Column(Text)
    booking_date = Column(Date, nullable=False)
    
    # Foreign key constraint
    __table_args__ = (
        ForeignKeyConstraint(['retreat_id'], ['retreats.retreat_id']),
    )

Base.metadata.create_all(bind=engine)
