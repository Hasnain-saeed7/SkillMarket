"""
One-time migration: add seller_id to gigs table if it does not exist.
Run from backend folder: python add_seller_id_column.py
"""
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from sqlalchemy import text
from database import engine

def run():
    # PostgreSQL: only add column if it doesn't exist
    with engine.connect() as conn:
        try:
            conn.execute(text("""
                ALTER TABLE gigs
                ADD COLUMN seller_id INTEGER REFERENCES users(id)
            """))
            conn.commit()
            print("Added seller_id column to gigs.")
        except Exception as e:
            conn.rollback()
            err = str(e).lower()
            if "already exists" in err or "duplicate" in err:
                print("Column seller_id already exists. Nothing to do.")
            else:
                # Try without FK in case of permission or order issues
                try:
                    conn.execute(text("ALTER TABLE gigs ADD COLUMN seller_id INTEGER"))
                    conn.commit()
                    print("Added seller_id column to gigs (no FK constraint).")
                except Exception as e2:
                    conn.rollback()
                    if "already exists" in str(e2).lower() or "duplicate" in str(e2).lower():
                        print("Column seller_id already exists.")
                    else:
                        print("Migration error:", e2)
                        raise

if __name__ == "__main__":
    run()
