import { Directive, ElementRef, HostListener, Input } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: "[appNoSpecialCharacter]",
})
export class NoSpecialCharacterDirective {
  @Input() isEng = false;
  @Input() isUsername = false;
  @Input() isBankAccount = false;
  private specialKeys = [
    "Backspace",
    "Tab",
    "End",
    "Home",
    "ArrowLeft",
    "ArrowRight",
    "Delete",
  ];

  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener("input", ["$event"])
  onInput(event) {
    const val = event.target.value;
    let r = "";
    if (this.isUsername) {
      r = val.replace(/[`~!#$%^&*()|+=?;:'",<>\{\}\[\]\\\/]/gi, "");
    } else if (this.isBankAccount) {
      r = val.replace(/[0-9`~!#$%^&*()|+=?;:'",<>\{\}\[\]\\\/]/gi, "");
    } else {
      r = val.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");
    }
    if (val) {
      this.control.control.setValue(r);
    }
  }

  @HostListener("keypress", ["$event"]) onKeyPress(event) {
    const e = <KeyboardEvent>event;
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }
    if (
      // Allow: 8-Backspace, 9-Tab, 13-Enter, 27-Esc
      [8, 9, 13, 27].indexOf(e.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (e.keyCode === 65 && e.ctrlKey === true) ||
      // Allow: Ctrl+C
      (e.keyCode === 67 && e.ctrlKey === true) ||
      // Allow: Ctrl+V
      (e.keyCode === 86 && e.ctrlKey === true) ||
      // Allow: Ctrl+X
      (e.keyCode === 88 && e.ctrlKey === true)
    ) {
      return;
    }
    let specials = [
      ",",
      "<",
      ">",
      "/",
      "?",
      ";",
      ":",
      "'",
      '"',
      "[",
      "{",
      "]",
      "}",
      "\\",
      "|",
      "`",
      "~",
      "!",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "=",
      "+",
    ];
    if (!this.isUsername) {
      specials = specials.concat([".", "-", "_", "@"]);
    }
    if (specials.indexOf(e.key) !== -1) {
      e.preventDefault();
    }
  }
}
