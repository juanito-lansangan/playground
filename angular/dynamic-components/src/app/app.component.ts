import { Component, ViewContainerRef, ViewChild, ComponentRef, ComponentFactoryResolver, ComponentFactory } from '@angular/core';
import { AlertComponent } from './alert/alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  @ViewChild("alertContainer", { read: ViewContainerRef }) container;
  componentRef: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver) {

  }

  createComponent(type) {
    this.container.clear();
    const factory: ComponentFactory<any> = this.resolver.resolveComponentFactory(AlertComponent)
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.type = type;
    this.componentRef.instance.output.subscribe(event => console.log(event));
  }

  alertSuccess() {
    this.createComponent('success');
  }

  alertDanger() {
    this.createComponent('danger');
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }
}
