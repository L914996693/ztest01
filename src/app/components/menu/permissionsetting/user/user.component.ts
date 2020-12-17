import { Component, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

interface ItemData {
  name: string;
  age: number | string;
  address: string;
  checked: boolean;
  expand: boolean;
  description: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  isVisible = false;

  private userlist:any={
    userName:'',
    createTime:''
  };

  validateForm!: FormGroup;
  addUservalidateForm:  FormGroup;

  listOfData: ItemData[] = [];
  displayData: ItemData[] = [];

  currentPageDataChange($event: ItemData[]): void {
    this.displayData = $event;
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  get isHorizontal(): boolean {
    return this.validateForm.controls.formLayout?.value === 'inline';
  }

  generateData(): ItemData[] {
    const data = [];
    for (let i = 1; i <= 100; i++) {
      data.push({
        name: 'John Brown',
        age: `${i}2`,
        address: `New York No. ${i} Lake Park`,
        description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
        checked: false,
        expand: false
      });
    }
    return data;
  }

  constructor(private fb: FormBuilder) {
    this.addUservalidateForm = this.fb.group({
      userName: ['', [Validators.required], []],//[this.userNameAsyncValidator]
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
      comment: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.listOfData = this.generateData();
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      rangePicker: [null, [Validators.required]]
    });
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  adduser(): void {
    this.isVisible = true;
  }
  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  //新增用户form
  submitFormaddUser(value: { userName: string; email: string; password: string; confirm: string; comment: string }): void {
    for (const key in this.addUservalidateForm.controls) {
      this.addUservalidateForm.controls[key].markAsDirty();
      this.addUservalidateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }

  resetFormaddUser(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.addUservalidateForm.controls) {
      this.addUservalidateForm.controls[key].markAsPristine();
      this.addUservalidateForm.controls[key].updateValueAndValidity();
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.addUservalidateForm.controls.confirm.updateValueAndValidity());
  }

  //校验用户名是否重复
  /* userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    }); */

    confirmValidator = (control: FormControl): { [s: string]: boolean } => {
      if (!control.value) {
        return { error: true, required: true };
      } else if (control.value !== this.addUservalidateForm.controls.password.value) {
        return { confirm: true, error: true };
      }
      return {};
    };

    
}
