import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'ite-footer-button',
  templateUrl: './footer-button.component.html',
  styleUrls: ['./footer-button.component.scss']
})
export class FooterButtonComponent implements OnInit {
  @Output() saveAction: EventEmitter<string> = new EventEmitter();
  @Output() cancelAction: EventEmitter<string> = new EventEmitter();
  @Input() showButton = false;
  @Input() reloading: boolean;
  constructor() { }

  ngOnInit(): void {
  }
  onNoClick() {
    this.cancelAction.emit();
  }
  save() {
    this.saveAction.emit();
  }
}
