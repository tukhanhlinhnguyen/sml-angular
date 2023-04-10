import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brand-logos',
  templateUrl: './brand-logos.component.html',
  styleUrls: ['./brand-logos.component.scss']
})

/**
 * BrandLogos Component
 */
export class BrandLogosComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Brand Logo Data
   */
   brandData = [
    {
      image:'assets/img/shop/brands/01.png',
    },
    {
      image:'assets/img/shop/brands/02.png',
    },
    {
      image:'assets/img/shop/brands/03.png',
    },
    {
      image:'assets/img/shop/brands/04.png',
    },
    {
      image:'assets/img/shop/brands/05.png',
    },
    {
      image:'assets/img/shop/brands/06.png',
    },
    {
      image:'assets/img/shop/brands/07.png',
    },
    {
      image:'assets/img/shop/brands/08.png',
    },
    {
      image:'assets/img/shop/brands/09.png',
    },
    {
      image:'assets/img/shop/brands/10.png',
    },
    {
      image:'assets/img/shop/brands/11.png',
    },
    {
      image:'assets/img/shop/brands/12.png',
    }
  ]

}
