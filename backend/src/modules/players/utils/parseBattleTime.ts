export function parseBattleTime(battleTime: string): Date {
  const year = battleTime.substring(0, 4);
  const month = battleTime.substring(4, 6);
  const day = battleTime.substring(6, 8);

  const hour = battleTime.substring(9, 11);
  const minute = battleTime.substring(11, 13);
  const second = battleTime.substring(13, 15);

  return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}.000Z`);
}
