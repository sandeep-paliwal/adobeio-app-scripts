/*
Copyright 2019 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
const mockConstructor = jest.fn()
const mockDebug = jest.fn()
mockDebug.extend = jest.fn()

// hack to expose constructor, somehow returning a jest.fn doesn't work as expected for commonjs (only es6)
const debug = function (...args) { mockConstructor(...args); return mockDebug }

// some fields that must exist
debug.formatters = {}

debug.mockConstructor = mockConstructor
debug.mockDebug = mockDebug
// alias
debug.mockReset = () => {
  debug.mockConstructor.mockReset()
  debug.mockDebug.mockReset()
}

module.exports = debug
