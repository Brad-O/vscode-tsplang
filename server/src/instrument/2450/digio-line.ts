'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind } from 'vscode-languageserver'

const digioLineCompletions: Array<CompletionItem> = [
    {
        data: ['digio'],
        documentation: {
            kind: MarkupKind.PlainText,
            value: 'Array of available I/O trigger lines. Indexed from 1 to 6.'
        },
        kind: CompletionItemKind.Field,
        label: 'line'
    },
    {
        data: ['line', 'digio'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ndigio.line[N].mode\n```\n\
\n\
Get or set the digital I/O line to digio.MODE_\\*. Defaults to digio.MODE_IN.'
        },
        kind: CompletionItemKind.Property,
        label: 'mode',
    },
    {
        data: ['line', 'digio'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction reset()\n```\n\
\n\
This function resets the following attributes to their default values: \
"digio.line[N].mode", \
"trigger.digin[N].edge", \
"trigger.digout[N].logic", \
"trigger.digout[N].pulsewidth", \
and "trigger.digout[N].stimulus". \
\n\
The value of "digio.line[N].state" will float high if nothing is connected to the digital line.\n\
\n\
It also clears "trigger.digin[N].overrun".'
        },
        kind: CompletionItemKind.Function,
        label: 'reset',
    },
    {
        data: ['line', 'digio'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\ndigio.line[N].state\n```\n\
\n\
Get or set the digital I/O line state to digio.STATE_HIGH or STATE_LOW.\n\
\n\
May be set to high on reset, as digial inputs float high if nothing is connected to the digital line.'
        },
        kind: CompletionItemKind.Property,
        label: 'state',
    },
]

export async function getDigioLineCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
            try {
                resolve(digioLineCompletions)
            } catch (e) {
                reject(new Error(e.toString()))
            }
    })
}