import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getApiClient } from '@/lib/api-client'
import type { Team, Researcher, Publication, StatsByYearItem, StatsByGroupItem } from '@/lib/types/api'

export const fetchTeams = createAsyncThunk('teams/fetch', async () => {
  const client = getApiClient()
  const res = await client.GET('/teams')
  return res.data ?? []
})

export const fetchResearchers = createAsyncThunk('researchers/fetch', async () => {
  const client = getApiClient()
  const res = await client.GET('/researchers', { params: { query: {} } })
  return res.data ?? []
})


export const fetchPublications = createAsyncThunk('publications/fetch', async () => {
  const client = getApiClient()
  const res = await client.GET('/publications', { params: { query: {} } })
  return res.data ?? []
})

export const fetchAnalytics = createAsyncThunk('analytics/fetch', async () => {
  const client = getApiClient()
  const [yearRes, teamRes, researcherRes] = await Promise.all([
    client.GET('/stats/publications-by-year', { params: { query: {} } }),
    client.GET('/stats/publications-by-team', { params: { query: {} } }),
    client.GET('/stats/publications-by-researcher', { params: { query: {} } }),
  ])

  return {
    byYear: yearRes.data ?? [],
    byTeam: teamRes.data ?? [],
    byResearcher: researcherRes.data ?? [],
  }
})

const teamsSlice = createSlice({
  name: 'teams',
  initialState: { items: [] as Team[], loading: false, error: '' as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to load teams'
      })
  },
})

const researchersSlice = createSlice({
  name: 'researchers',
  initialState: { items: [] as Researcher[], loading: false, error: '' as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResearchers.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchResearchers.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchResearchers.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to load researchers'
      })
  },
})

const publicationsSlice = createSlice({
  name: 'publications',
  initialState: { items: [] as Publication[], loading: false, error: '' as string | null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublications.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchPublications.fulfilled, (state, action) => {
        state.items = action.payload
        state.loading = false
      })
      .addCase(fetchPublications.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to load publications'
      })
  },
})

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    byYear: [] as StatsByYearItem[],
    byTeam: [] as StatsByGroupItem[],
    byResearcher: [] as StatsByGroupItem[],
    loading: false,
    error: '' as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.byYear = action.payload.byYear
        state.byTeam = action.payload.byTeam
        state.byResearcher = action.payload.byResearcher
        state.loading = false
      })
      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message ?? 'Failed to load analytics'
      })
  },
})

export const store = configureStore({
  reducer: {
    teams: teamsSlice.reducer,
    researchers: researchersSlice.reducer,
    publications: publicationsSlice.reducer,
    analytics: analyticsSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

