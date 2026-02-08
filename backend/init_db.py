
import sys
import os

# This line forces Python to look at the current folder for imports
sys.path.append(os.getcwd())

from database import SessionLocal, engine, Base
import models 
from seed_data import MOCK_GIGS


# ... rest of your code stays the same ...
def seed_database():
    # Create the tables in PostgreSQL
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # Check if data already exists
        if db.query(models.Gig).count() == 0:
            print("Seeding SkillMarket database...")
            for gig_data in MOCK_GIGS:
                db_gig = models.Gig(**gig_data)
                db.add(db_gig)
            db.commit()
            print("Successfully seeded!")
        else:
            print("Database already has data.")
    except Exception as e:
        print(f"Error: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()