export type AssetsByOwnerResponse = {
  last_indexed_slot: number;
  total: number;
  limit: number;
  page: number;
  items: HeliusAsset[];
};

export type HeliusAsset = {
  interface: string; // e.g. "V1_NFT"
  id: string;

  content: {
    $schema?: string;
    json_uri?: string;
    files?: AssetFile[];
    metadata?: AssetMetadata;
    links?: AssetLinks;
    category?: string; // "image" | "video" | etc (keep string for now)
  };

  authorities: Authority[];
  compression: Compression;
  grouping: Grouping[];

  royalty: Royalty;
  creators: Creator[];

  ownership: Ownership;
  supply: Supply;

  mutable: boolean;
  burnt: boolean;
};

export type AssetFile = {
  uri: string;
  cdn_uri?: string;
  mime?: string;
};

export type AssetMetadata = {
  name?: string;
  symbol?: string;
  description?: string;
  token_standard?: string; // "NonFungible" etc
  attributes?: Attribute[];
};

export type Attribute = {
  trait_type?: string;
  value: string | number;
  max_value?: number;
  display_type?: string;
};

export type AssetLinks = {
  image?: string;
  external_url?: string;
};

export type Authority = {
  address: string;
  scopes: string[]; // usually ["full"]
};

export type Compression = {
  eligible: boolean;
  compressed: boolean;
  data_hash: string;
  creator_hash: string;
  asset_hash: string;
  tree: string;
  seq: number;
  leaf_id: number;
};

export type Grouping = {
  group_key: string; // e.g. "collection"
  group_value: string; // collection address
};

export type Royalty = {
  royalty_model: string; // e.g. "creators"
  target: string | null;
  percent: number;
  basis_points: number;
  primary_sale_happened: boolean;
  locked: boolean;
};

export type Creator = {
  address: string;
  share: number;
  verified: boolean;
};

export type Ownership = {
  frozen: boolean;
  delegated: boolean;
  delegate: string | null;
  ownership_model: string; // e.g. "single"
  owner: string;
};

export type Supply = {
  print_max_supply: number;
  print_current_supply: number;
  edition_nonce: number | null;
};
