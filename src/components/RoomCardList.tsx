import RoomCard from './RoomCard';

export interface Room {
  id: number;
  level: string;
  title: string;
  date: string;
  time: string;
  location: string;
}

interface RoomCardListProps {
  rooms: Room[];
}

export default function RoomCardList({ rooms }: RoomCardListProps) {
  return (
    <div className="space-y-4">
      {rooms.map((room) => (
        <RoomCard key={room.id} {...room} />
      ))}
    </div>
  );
}
