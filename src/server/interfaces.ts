export interface DbServiceInterface {
    getDb()
}

export interface RedisServiceInterface {
	getClient()
}

export interface DnaServiceInterface {
	isMutant (dna: Array<string>): boolean
}

export interface CacheServiceInterface {
	getStats (),
	setStats (data: JSON): void
}

export interface RepositoryInterface {
	addDna(dna: string, isMutant: boolean, callback),
	getStats()
}

export interface RedisClientInterface {}

export interface DnaModelInterface {
  dna: string,
  isMutant: boolean
}