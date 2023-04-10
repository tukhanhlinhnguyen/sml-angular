import { Component, OnInit } from '@angular/core';

// Data Get
import { TopicData } from './data';

@Component({
  selector: 'app-help-topics',
  templateUrl: './help-topics.component.html',
  styleUrls: ['./help-topics.component.scss']
})

/**
 * Help Topics Component
 */
export class HelpTopicsComponent implements OnInit {

  topicDatas:any;
  term:any;

  constructor() { 
    this.topicDatas = TopicData;
  }

  ngOnInit(): void {
  }

}
