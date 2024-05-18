import { JsonPipe } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, ViewChild, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import {
  COLOR_GRID_ITEMS,
  ColorGridSelectComponent,
} from '@brew/ng/ui/components';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
   FormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    ColorGridSelectComponent,
  ],
  selector: 'brew-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit,AfterViewChecked {
  ngAfterViewChecked(): void {
    this.form.value.color = this.ColorGridSelectComponent?.value;
  }
   rowWidth =  signal(0);
   componentwidthobj :any
   

  ngAfterViewInit(): void {
    setTimeout(()=>{
      const colorGridWidth:any = document.getElementById('colorGridElementRef');
      // Get all the small component elements
        let num = 0;
        let rownum = 0
      if (colorGridWidth) {
        const rows = colorGridWidth.querySelectorAll('.flex'); // Select all rows
          let rowWidth = 0;
          rows.forEach((row: HTMLElement,i:number) => {
            const colorGridItems = row.querySelectorAll('brew-color-grid-item');
            if(colorGridItems.length>0){
              rownum +=1
              num +=1
            }
            colorGridItems.forEach((item: any,i1:number) => {
              if(i == 0){
                rowWidth += item.offsetWidth;
              }
              i1+=1
              item.id1 = 'row-'+rownum+'-item-'+i1
            });

          
          })
      
          this.rowWidth.set(rowWidth)
       
      }

   this.componentwidthobj = Object.assign({})
   this.componentwidthobj.RowWidth = this.rowWidth() + 'px';
   this.componentwidthobj.ComponentWidth = colorGridWidth?.offsetWidth + 'px';
   this.componentwidthobj["Number of colors in row"] = num +1;

    })

 
  }
  private readonly _fb = inject(FormBuilder);
   public coloritems :any=[...COLOR_GRID_ITEMS]
  public readonly form = this._fb.group({
    search: this._fb.control(''),
    color: this._fb.control(COLOR_GRID_ITEMS[2], {
      validators: [Validators.required],
    }),
  });
@ViewChild(ColorGridSelectComponent) ColorGridSelectComponent:ColorGridSelectComponent | undefined
  submit(){
   if(this.form.controls.search.value?.includes(',')){
    this.coloritems =this.form.controls.search.value.split(',')
   }else{
    this.coloritems.push(this.form.controls.search.value)
   }
   this.form.controls.search.setValue('');
   
  }
}
