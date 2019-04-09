import { Component, EventEmitter, Input, Output} from '@angular/core';

@Component ({
  selector: 'app-color-menu',
  templateUrl: './color-menu.component.html',
  styleUrls: ['./color-menu.component.css']
})
export class ColorMenuComponent{

    @Output() public setColorTheme : EventEmitter<string> = new EventEmitter();
    @Input() public colorItems;
    
    constructor(){}
    
    onSetTheme(inx) {
        this.setColorTheme.emit(this.colorItems[inx].colorClass);
    }
}
