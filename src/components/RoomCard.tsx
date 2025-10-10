import { Link } from "react-router-dom";
import { Users, Wifi, Tv, Wind, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RoomType } from "@/lib/roomUtils";
import roomQueenImg from "@/assets/room-queen.jpg";
import roomKingImg from "@/assets/room-king.jpg";
import roomDoubleQueenImg from "@/assets/room-double-queen.jpg";

interface RoomCardProps {
  roomType: RoomType;
}

const getRoomImage = (code: string) => {
  switch (code) {
    case "NSK":
    case "SK":
      return roomKingImg;
    case "NSQQ":
      return roomDoubleQueenImg;
    default:
      return roomQueenImg;
  }
};

export function RoomCard({ roomType }: RoomCardProps) {
  const roomImage = (roomType as any).imageUrl || getRoomImage(roomType.code);
  
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
        <img
          src={roomImage}
          alt={`${roomType.name} room at Executive Inn`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <Badge variant={roomType.isSmoking ? "destructive" : "secondary"}>
            {roomType.isSmoking ? "Smoking" : "Non-Smoking"}
          </Badge>
          <Badge variant="outline" className="bg-background">
            {roomType.count} Available
          </Badge>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle className="text-2xl">{roomType.name}</CardTitle>
        <CardDescription>{roomType.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>Up to {roomType.occupancy} guests</span>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-1 text-xs">
            <Wifi className="h-3 w-3" />
            <span>Wi-Fi</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Tv className="h-3 w-3" />
            <span>TV</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Wind className="h-3 w-3" />
            <span>AC/Heat</span>
          </div>
          <div className="flex items-center gap-1 text-xs">
            <Coffee className="h-3 w-3" />
            <span>Fridge</span>
          </div>
        </div>
        
        <div className="pt-2 border-t">
          <p className="text-2xl font-serif font-bold text-accent">
            ${roomType.rate}
            <span className="text-sm font-normal text-muted-foreground"> / night</span>
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2">
        <Link to={`/rooms/${roomType.code}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
        <Link to={`/book?roomType=${roomType.code}`} className="flex-1">
          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            Book Now
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
