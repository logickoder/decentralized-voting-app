export enum ResultStatusState {
  NotAnnounced,
  Announced
}

export type ResultStatus = {
  state: ResultStatusState;
  winner?: string;
}

export function getResultStatusStateText(status: ResultStatusState) {
  return status === ResultStatusState.Announced ? 'Announced' : 'Not Announced';
}