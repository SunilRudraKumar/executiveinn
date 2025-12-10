-- 1. Fix Room Code Mismatch
-- HotelKey uses 'DQ', we had 'NSQQ'.
UPDATE room_types 
SET code = 'DQ' 
WHERE code = 'NSQQ';

-- 2. Seed Initial Inventory
-- Set all rooms to 10 available so we don't start at 0.
UPDATE room_types 
SET display_count = 10;

-- 3. (Optional) Verify the update
SELECT * FROM room_types;
