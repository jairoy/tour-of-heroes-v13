import { Component, Input, OnInit } from "@angular/core";
import { Hero } from "../../../core/models/hero.model";
import { HeroService } from "../../../core/services/hero.service";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder,  Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
    selector: 'app-hero-detail',
    templateUrl: './hero-detail.component.html'
    
})
export class HeroDetailComponent implements OnInit{
   constructor( private fb: FormBuilder,
                private heroService: HeroService, 
                private location: Location,
                private route: ActivatedRoute,
                private snackBar: MatSnackBar){}

    hero!: Hero;
    isEditing = false;

    form = this.fb.group({
        id: [{ value: 0, disabled: true}],
        name: ['', [Validators.required, Validators.minLength(3)]]
    });

    ngOnInit(): void {
        this.getHero();
    }

    getHero(): void{
        const paramId = this.route.snapshot.paramMap.get('id');
        
        if (paramId !== 'new') {
            const id = Number(paramId);
            this.isEditing =  true;
            this.heroService.getOne(id).subscribe((hero) => 
              {this.hero = hero; 
               this.form.controls['id'].setValue(hero.id);
               this.form.controls['name'].setValue(hero.name);
              }
            )
        }        
    }
    
    goBack(): void{
        this.location.back();
    }

    create(): void{
        const { valid , value } = this.form;

        if (valid){
            const hero: Hero ={
                name: value.name
            } as Hero
            this.heroService.create(hero).subscribe(() => this.goBack());
        }else{
            this.showErrorMsg();
        }
        
    }

    update(): void{
        const { valid, value } = this.form;       

        if (valid) {
          const hero: Hero = {
              id: this.hero.id,
              name: value.name
          } as Hero;
          this.heroService.update(hero).subscribe(() => this.goBack());
        }else{
            this.showErrorMsg();
        } 
    }

    private showErrorMsg(): void{
        this.snackBar.open('Please check the errors found.', 'Ok' , {
            duration:5000,
            verticalPosition:'top'
        })
    }
}
