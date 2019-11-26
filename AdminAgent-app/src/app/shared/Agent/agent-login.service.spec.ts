import { TestBed } from '@angular/core/testing';

import { AgentLoginService } from './agent-login.service';

describe('AgentLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgentLoginService = TestBed.get(AgentLoginService);
    expect(service).toBeTruthy();
  });
});
