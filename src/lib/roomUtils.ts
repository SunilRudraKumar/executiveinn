import roomsData from "@/data/rooms.json";

export interface Room {
  number: number;
  type: string;
}

export interface RoomType {
  code: string;
  name: string;
  count: number;
  description: string;
  rate: number;
  occupancy: number;
  isSmoking: boolean;
  amenities: string[];
}

export function getAllRooms(): Room[] {
  return roomsData.floors.flatMap(floor => floor.rooms);
}

export function getRoomTypeCounts(): Record<string, number> {
  const rooms = getAllRooms();
  const counts: Record<string, number> = {};
  
  rooms.forEach(room => {
    counts[room.type] = (counts[room.type] || 0) + 1;
  });
  
  return counts;
}

export function getRoomTypes(): RoomType[] {
  const counts = getRoomTypeCounts();
  const legend = roomsData.legend as Record<string, string>;
  
  const typeDetails: Record<string, Omit<RoomType, 'code' | 'name' | 'count'>> = {
    NSQ: {
      description: "Comfortable queen bed in a non-smoking room with modern amenities.",
      rate: 79,
      occupancy: 2,
      isSmoking: false,
      amenities: ["Queen Bed", "Free Wi-Fi", "Flat Screen TV", "Mini Fridge", "Microwave", "AC/Heat"]
    },
    SQ: {
      description: "Queen bed in a designated smoking room with all standard amenities.",
      rate: 79,
      occupancy: 2,
      isSmoking: true,
      amenities: ["Queen Bed", "Free Wi-Fi", "Flat Screen TV", "Mini Fridge", "Microwave", "AC/Heat"]
    },
    NSQQ: {
      description: "Spacious room with two queen beds, perfect for families or groups.",
      rate: 89,
      occupancy: 4,
      isSmoking: false,
      amenities: ["Two Queen Beds", "Free Wi-Fi", "Flat Screen TV", "Mini Fridge", "Microwave", "AC/Heat"]
    },
    NSK: {
      description: "Roomy king bed in a non-smoking room, ideal for a relaxing stay.",
      rate: 85,
      occupancy: 2,
      isSmoking: false,
      amenities: ["King Bed", "Free Wi-Fi", "Flat Screen TV", "Mini Fridge", "Microwave", "AC/Heat"]
    },
    SK: {
      description: "King bed in a designated smoking room with premium comfort.",
      rate: 85,
      occupancy: 2,
      isSmoking: true,
      amenities: ["King Bed", "Free Wi-Fi", "Flat Screen TV", "Mini Fridge", "Microwave", "AC/Heat"]
    }
  };
  
  return Object.entries(legend).map(([code, name]) => ({
    code,
    name,
    count: counts[code] || 0,
    ...typeDetails[code]
  }));
}

export function getRoomTypeByCode(code: string): RoomType | undefined {
  return getRoomTypes().find(rt => rt.code === code);
}

export function calculateStayCost(roomType: RoomType, nights: number): {
  subtotal: number;
  tax: number;
  total: number;
} {
  const subtotal = roomType.rate * nights;
  const tax = subtotal * 0.13; // 13% tax rate (mock)
  const total = subtotal + tax;
  
  return { subtotal, tax, total };
}
