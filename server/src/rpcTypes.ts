/*
 *  Copyright Tektronix Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
// tslint:disable:variable-name

import { NotificationType, RequestType } from 'vscode-jsonrpc'
import { Diagnostic, PublishDiagnosticsParams, TextDocumentItem } from 'vscode-languageserver'

import { CommandSet } from './instrument'
import { TsplangSettings } from './settings'
import { Shebang } from './shebang'

export const ErrorNotification = new NotificationType<PublishDiagnosticsParams, void>('ErrorNotification')

export interface ContextReply {
    commands: CommandSet
    item: TextDocumentItem
    settings: TsplangSettings
    shebang: Shebang
    shebangDiagnostics: Array<Diagnostic>
}
export const ContextRequest = new RequestType<string, ContextReply, void, void>('ContextRequest')