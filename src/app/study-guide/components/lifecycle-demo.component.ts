import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lifecycle-demo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lifecycle-demo">
      <h4>Demo Component (Lifecycle Events)</h4>
      <p>Input Data: {{ inputData }}</p>
      <p>Component ID: {{ componentId }}</p>
      <p>Render Count: {{ renderCount }}</p>
    </div>
  `,
  styleUrl: './lifecycle-demo.component.sass'
})
export class LifecycleDemoComponent implements OnInit, OnDestroy, OnChanges {
  @Input() inputData: string = '';
  @Output() lifecycleEvent = new EventEmitter<{name: string, data: string}>();
  
  componentId = Math.random().toString(36).substring(7);
  renderCount = 0;

  ngOnInit() {
    this.renderCount++;
    this.lifecycleEvent.emit({
      name: 'ngOnInit',
      data: `Component ${this.componentId} initialized`
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.renderCount++;
    if (changes['inputData']) {
      this.lifecycleEvent.emit({
        name: 'ngOnChanges',
        data: `Input changed from "${changes['inputData'].previousValue}" to "${changes['inputData'].currentValue}"`
      });
    }
  }

  ngOnDestroy() {
    this.lifecycleEvent.emit({
      name: 'ngOnDestroy',
      data: `Component ${this.componentId} destroyed`
    });
  }
}
