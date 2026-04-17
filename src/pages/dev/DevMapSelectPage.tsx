import { useLayoutEffect, useState } from "react";

import { MapHomePage_WithFilter } from "@/pages/map/MapHomePage_WithFilter";
import { FRIEND_ROOM_MOCK_ROWS } from "@/pages/room/friend-room-mock";
import { useRoomSelectionStore } from "@/store/room-selection-store";
import { useUiStore } from "@/store/uiStore";

export function DevMapSelectPage() {
  const selectRoom = useRoomSelectionStore((state) => state.selectRoom);
  const setFilterOpen = useUiStore((state) => state.setFilterOpen);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const devRoom = FRIEND_ROOM_MOCK_ROWS[0];

    if (!devRoom) {
      setReady(true);
      return;
    }

    selectRoom({
      id: devRoom.id,
      name: devRoom.displayName,
      memberCount: devRoom.memberCount,
    });
    setFilterOpen(false);
    setReady(true);
  }, [selectRoom, setFilterOpen]);

  if (!ready) {
    return null;
  }

  return <MapHomePage_WithFilter />;
}
