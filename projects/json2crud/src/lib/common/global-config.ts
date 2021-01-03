import { EventEmitter } from '@angular/core';

export class GlobalConfig {
  isEditing = false;
  readonly propertiesMap: Map<string, Map<string, any>> = new Map();
  builder = false;
  editor = true;
}

export class ChangeTracker {

}

export class JsonNodeConfig {
  key = false;
  input: [] | {} | 'text' | 'textarea' | 'checkbox' | 'datetime' | 'select' | 'custom' = 'text';
  listOptions = [];
  name = '';
  url = '';
  noNewProperty = false;
  hidden = false;
  default: any;
  customEditor: CustomEditor;
  unique = true;
}

export class CustomEditor {
  name = '';
  icon = '';
  action: EventEmitter<{}>;
}

export class PropertyTester {
  isValidToAdd(config): boolean {
    return !config.hidden;
  }
}
