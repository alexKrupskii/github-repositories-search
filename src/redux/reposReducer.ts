import {RepoDetailsType, repoService, RepoType} from '../services/repo-service';
import {Dispatch} from 'redux';
import {AppStateType} from './store';

export type LoadingStatusType = "NONE" | "SUCCESS" | "IN-PROGRESS" | "ERROR"

const initialState = {
    repos: [] as Array<RepoType>,
    pageSize: 10,
    currentPage: 1,
    totalCount: 0,
    loadingStatus: "NONE" as LoadingStatusType,
    currentRepo: null as RepoDetailsType | null,
    searchQuery: "",
    errorMessage: null as string | null
}
type StateType = typeof initialState

type ActionsType = ReturnType<typeof getReposSuccess>
    | ReturnType<typeof setLoadingStatus>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalCount>
    | ReturnType<typeof getSingleRepoSuccess>
    | ReturnType<typeof setSearchQuery>
    | ReturnType<typeof setErrorMessage>

export const reposReducer = (state: StateType = initialState, action: ActionsType): StateType => {
    console.log(action.type);
    console.log(action.payload);
    switch (action.type) {
        case "github/repositories/GET_REPOS_SUCCESS":
        case "github/repositories/SET_LOADING_STATUS":
        case "github/repositories/SET_CURRENT_PAGE":
        case "github/repositories/SET_TOTAL_COUNT":
        case "github/repositories/GET_SINGLE_REPO_SUCCESS":
        case "github/repositories/SET_SEARCH_QUERY":
        case "github/repositories/SET_ERROR_MESSAGE":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;

    }
}

const getReposSuccess = (repos: Array<RepoType>) => ({
    type: "github/repositories/GET_REPOS_SUCCESS",
    payload: {repos}
} as const)
export const getSingleRepoSuccess = (currentRepo: RepoDetailsType | null) => ({
    type: "github/repositories/GET_SINGLE_REPO_SUCCESS",
    payload: {currentRepo}
} as const)
const setLoadingStatus = (loadingStatus: LoadingStatusType) => ({
    type: "github/repositories/SET_LOADING_STATUS",
    payload: {loadingStatus}
} as const)
const setErrorMessage = (errorMessage: string) => ({
    type: "github/repositories/SET_ERROR_MESSAGE",
    payload: {errorMessage}
} as const)
export const setCurrentPage = (currentPage: number) => ({
    type: "github/repositories/SET_CURRENT_PAGE",
    payload: {currentPage}
} as const)
const setTotalCount = (totalCount: number) => ({
    type: "github/repositories/SET_TOTAL_COUNT",
    payload: {totalCount}
} as const)
export const setSearchQuery = (searchQuery: string) => ({
    type: "github/repositories/SET_SEARCH_QUERY",
    payload: {searchQuery}
} as const)

export const getRepos = () => async (dispatch: Dispatch, getState: () => AppStateType) => {
    let reposState = getState().repos;

    dispatch(setLoadingStatus('IN-PROGRESS'))

    try {
        const reposResult = await repoService.getRepos(reposState.searchQuery, reposState.currentPage, reposState.pageSize)
        dispatch(setTotalCount(reposResult.total_count));
        dispatch(getReposSuccess(reposResult.items));
        dispatch(setLoadingStatus('NONE'));
    } catch (error) {
        dispatch(setLoadingStatus('ERROR'));
        console.error(error);
        dispatch(setErrorMessage("Some error. Look at dev console for details"));
    }

}

export const getSingleRepo = (ownerName: string, repoName: string) => async (dispatch: Dispatch, getState: () => AppStateType) => {

    dispatch(setLoadingStatus('IN-PROGRESS'))

    const repo = await repoService.getSingleRepo(ownerName, repoName);

    dispatch(getSingleRepoSuccess(repo));
    dispatch(setLoadingStatus('NONE'));
}

