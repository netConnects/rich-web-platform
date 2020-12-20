# RichWebPlatform

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.3.

     
 <!--
<---Parent < --- child <---divider----/\> <------child-----/\>----/parent/-\>

  panel1.0
 <bb-panel #bottomWindow236 id="bottom-window2" [isView]='false' [divider]="divider3q" [rFlex]="true">
      panel1.1
      <bb-panel id="top-window2" #topWindow2q [isView]='false' [parent]="bottomWindow236" [rFlex]="true">
      </bb-panel>

      //divide the panel| axis help to determain the drag direction
      <bb-panel-divider #divider3q [parent]="bottomWindow236" [axis]="'y'"></bb-panel-divider>
      panel2.1
      <bb-panel #bottomWindow23q id="bottom-window2" [isView]='false' [parent]="bottomWindow236" [rFlex]="true">
        <iframe frameborder="0" style="width:100%;height:100%;"
          src="https://viewer.diagrams.net/?highlight=0000ff&edit=https%3A%2F%2Fapp.diagrams.net%2F%23G1A2RwwXj5u9Pzx2Yay0hsWD4EvFW_K5a7&layers=1&nav=1#G1A2RwwXj5u9Pzx2Yay0hsWD4EvFW_K5a7"></iframe>

      </bb-panel>
    </bb-panel>-->

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
