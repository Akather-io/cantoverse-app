export interface ITokenMetadata {
  title: string;
  description: string;
  media?: string;
  media_hash?: string;
  copies?: number;
  expires_at?: string;
  extra?: string;
  issued_at?: number;
  reference?: string;
  reference_hash?: string;
  starts_at?: string;
  updated_at?: string;
}
export interface ICertificate {
  approved_account_ids: any;
  metadata: ITokenMetadata;
  owner_id: string;
  token_id: string;
}
