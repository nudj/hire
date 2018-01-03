declare type Action =
  | {
      type: 'START_PARSING_LINKEDIN_CONNECTIONS'
    }
  | {
      type: 'COMPLETE_PARSING_LINKEDIN_CONNECTIONS',
      connections: Array<Connection>
    }
  | {
      type: 'START_CONNECTIONS_UPLOAD'
    }
  | {
      type: 'COMPLETE_CONNECTIONS_UPLOAD'
    }

declare type Dispatch = (
  action: Action | Promise<Action> | Function
) => Promise<any>
