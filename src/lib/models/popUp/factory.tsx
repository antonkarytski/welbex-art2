import React, { ReactElement } from 'react'
import { PopUpModel } from './model'

type ModelProps<P = any> = { model: PopUpModel<P> }
export type IPopUp<P = {}, MT = any> = ((props: P) => ReactElement | null) &
  PopUpController<MT>
type WOModel<P extends ModelProps> = Omit<P, 'model'>
type IPopUpComponent<CP extends ModelProps> = (props: CP) => ReactElement | null
type PickedProps<
  CP extends ModelProps,
  ACP extends Partial<WOModel<CP>>
> = Pick<WOModel<CP>, Exclude<keyof WOModel<CP>, keyof ACP>> & Partial<ACP>

type PopUpController<MT = any> = {
  show: PopUpModel<MT>['show']
  showSync: PopUpModel<MT>['showSync']
  hide: PopUpModel['hide']
  hideSync: PopUpModel['hideSync']
  $isMounted: PopUpModel['$isMounted']
  model: PopUpModel<MT>
}

export class PopUpFactory<CP extends ModelProps> {
  public static createModel<P = any>() {
    return new PopUpModel<P>()
  }
  public static appendModel<T, MT>(
    RawComponent: (props: T) => ReactElement | null,
    model: PopUpModel<MT>
  ) {
    const Component = RawComponent as IPopUp<T, MT>
    Component.model = model
    Component.hide = model.hide
    Component.hideSync = model.hideSync
    Component.show = model.show
    Component.showSync = model.showSync
    Component.$isMounted = model.$isMounted
    return Component
  }

  private readonly Component
  constructor(Component: IPopUpComponent<CP>) {
    this.Component = Component
  }

  public readonly createModel = PopUpFactory.createModel
  public readonly appendModel = PopUpFactory.appendModel

  public create<ACP extends Partial<WOModel<CP>>>(defaultProps?: ACP) {
    const Component = this.Component
    const model = this.createModel()
    const PopUpComponent = (props: PickedProps<CP, ACP>) => {
      //@ts-ignore
      return <Component {...defaultProps} {...props} model={model} />
    }
    return this.appendModel(PopUpComponent, model)
  }
}
