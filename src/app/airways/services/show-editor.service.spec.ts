import { TestBed } from '@angular/core/testing';

import { ShowEditorService } from './show-editor.service';

describe('ShowEditorService', () => {
  let service: ShowEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
