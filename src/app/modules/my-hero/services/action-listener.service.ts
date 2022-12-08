import { Injectable } from "@angular/core";
import { Action, ActionsSubject } from "@ngrx/store";
import { distinctUntilChanged, filter, Observable, pluck } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { getFailureTypeAction, getSuccessTypeAction } from "../store/constants/get-action-type.constants";

export interface StatusAction {
    status: boolean;
    action: any;
}

const defaultActionStatusState: StatusAction = {
    status: false,
    action: null
};

@Injectable({
    providedIn: 'root'
})
export class ActionsListenerService {

    constructor(private actionsSubject: ActionsSubject) {}

    public getProgressStatus<T>(
        action: Action,
        actionPayloadIdFilter?: string | ((action: T) => boolean)
    ): Observable<boolean> {
        return this.isInProgress(action)
            .pipe(
                filter((statusAction: StatusAction): boolean =>
                    this.isCurrentActionByPayloadId<T>(statusAction, actionPayloadIdFilter)),
                pluck('status'),
                distinctUntilChanged()
            );
    }

    public isInProgress({ type }: Action): Observable<StatusAction> {
        return this.actionsSubject
            .pipe(
                startWith(defaultActionStatusState),
                filter((action: Action): boolean => this.isCurrentAction(action, type)),
                map((action: Action): StatusAction => ({
                    status: action.type === type,
                    action
                }))
            );
    }

    private isCurrentAction(
        action: Action,
        actionType: string,
        strictTypeComparison = false): boolean {
        return strictTypeComparison
            ? actionType === action.type
            : [actionType, getSuccessTypeAction(actionType), getFailureTypeAction(actionType)].includes(action.type);
    }

    private isCurrentActionByPayloadId<T>(
        statusAction: StatusAction,
        actionPayloadIdFilter: string | ((action: T) => boolean)
    ): boolean {
        if (!actionPayloadIdFilter) {
            return true;
        }
        if (typeof actionPayloadIdFilter === 'function') {
            return actionPayloadIdFilter(statusAction.action);
        }
        const action = statusAction.action;
        return (action?.id || action?.payload?.id) === actionPayloadIdFilter;
    }

}

