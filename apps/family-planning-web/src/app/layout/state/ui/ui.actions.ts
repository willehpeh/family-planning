import { createAction, props } from '@ngrx/store';

export const OpenSideMenu = createAction('[HeaderComponent] Open Side Menu');
export const CloseSideMenu = createAction('[SideMenuComponent] Close Side Menu');
export const SetBackButtonPath = createAction(
  '[NavFacade] Set Back Button Path',
  props<{ path: string }>()
);
export const ClearBackButton = createAction('[NavFacade] Clear Back Button');
