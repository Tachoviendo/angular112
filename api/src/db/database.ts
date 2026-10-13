import { Pool } from "pg";

import type { PoolConfig } from "pg";

const pgConfig: PoolConfig = {};

export const myPool = new Pool(pgConfig);
