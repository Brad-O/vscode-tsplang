'use strict'

import { CompletionItem, CompletionItemKind, MarkupKind, ParameterInformation, SignatureInformation } from 'vscode-languageserver'

const fileCompletions: Array<CompletionItem> = [
    {
        kind: CompletionItemKind.Module,
        label: 'file'
    },
    {
        data: ['file'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction close(fileNumber)\n```\n\nfile.close(fileNumber)\n\
\n\
Close the given file descriptor, flushing any buffered file output data.\n\
\n\
Files are automatically closed when file descriptors are garbage collected.'
        },
        kind: CompletionItemKind.Function,
        label: 'close',
    },
    {
        data: ['file'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction flush(fileNumber)\n```\n\nfile.flush(fileNumber)\n\
\n\
Force a write of all buffered file output data.\n\
\n\
The file.write() function may buffer data instead of writing immediately to the USB flash drive, so calling this \
function is recommended before exiting your script to prevent loss of data.'
        },
        kind: CompletionItemKind.Function,
        label: 'flush',
    },
    {
        data: ['file'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction mkdir(path)\n```\n\nfile.mkdir(path)\n\
\n\
Create a directory at the absolute path specified on the USB flash drive.\n\
\n\
An error is logged if one or more parent directories contained within the specified path do not exist.\n\
\n\
The "/usb1/" prefix is optional.'
        },
        kind: CompletionItemKind.Function,
        label: 'mkdir',
    },
    {
        data: ['file'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction open(fileName, accessType)\n```\n\nfile.open(fileName, file.MODE_\\*) -> number\n\
\n\
Returns a number representing an open file descriptor.\n\
\n\
The given fileName should be absolute and begin with "/usb1/".'
        },
        kind: CompletionItemKind.Function,
        label: 'open',
    },
    {
        data: ['file'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction read(fileNumber, readAction)\n```\n\
\n\
file.read(fileNumber, file.READ_\\*) -> string | number | nil\n\
\n\
Returns the file content as a string or nil if the end of the file has been reached.\n\
\n\
If readAction is file.READ_NUMBER, the function returns the next set of digits in the file as a number. \
Should the next set of characters not be limited to digits, then "<ERR>" is returned and an error logged.'
        },
        kind: CompletionItemKind.Function,
        label: 'read',
    },
    {
        data: ['file'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction usbdriveexists()\n```\n\nfile.usbdriveexists() -> 0 | 1\n\
\n\
Returns 1 if a flash drive is detected in the front-panel USB port and 0 otherwise.'
        },
        kind: CompletionItemKind.Function,
        label: 'usbdriveexists',
    },
    {
        data: ['file'],
        documentation: {
            kind: MarkupKind.Markdown,
            value: '```lua\nfunction write(fileNumber, data)\n```\n\nfile.write(fileNumber, data)\n\
\n\
Write the data string to the specified file.\n\
\n\
Data may be buffered and not be written to the USB flash drive immediately. Call file.flush() to force a file \
write.\n\
\n\
Files should be closed before script exit via file.close().'
        },
        kind: CompletionItemKind.Function,
        label: 'write',
    },
]

const fileSignatures: Array<SignatureInformation> = [
    SignatureInformation.create(
        'file.close(fileNumber)',
        undefined,
        ParameterInformation.create(
            'fileNumber',
            'A file reference returned from the file.open() function.'
        ),
    ),
    SignatureInformation.create(
        'file.flush(fileNumber)',
        undefined,
        ParameterInformation.create(
            'fileNumber',
            'A file reference returned from the file.open() function.'
        ),
    ),
    SignatureInformation.create(
        'file.mkdir(path)',
        undefined,
        ParameterInformation.create(
            'path',
            "Directory path. May begin with '/usb1/'."
        ),
    ),
    SignatureInformation.create(
        'file.open(fileName, accessType)',
        undefined,
        ParameterInformation.create(
            'fileName',
            'Absolute filepath to the target file.'
        ),
        ParameterInformation.create(
            'accessType',
            'One of:\n\
file.MODE_APPEND\n\
file.MODE_READ\n\
file.MODE_WRITE'
        ),
    ),
    SignatureInformation.create(
        'file.read(fileNumber, readAction)',
        undefined,
        ParameterInformation.create(
            'fileNumber',
            'A file reference returned from the file.open() function.'
        ),
        ParameterInformation.create(
            'readAction',
            'One of:\n\
file.READ_LINE\n\
file.READ_NUMBER\n\
file.READ_ALL'
        ),
    ),
    SignatureInformation.create(
        'file.write(fileNumber, data)',
        undefined,
        ParameterInformation.create(
            'fileNumber',
            'A file reference returned from the file.open() function.'
        ),
        ParameterInformation.create(
            'data',
            'The string to write to the file.'
        ),
    ),
]

export async function getFileCompletions(): Promise<Array<CompletionItem>> {
    return new Promise<Array<CompletionItem>>((
        resolve: (value?: Array<CompletionItem>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(fileCompletions)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}

export async function getFileSignatures(): Promise<Array<SignatureInformation>> {
    return new Promise<Array<SignatureInformation>>((
        resolve: (value?: Array<SignatureInformation>) => void,
        reject: (reason?: Error) => void
    ): void => {
        try {
            resolve(fileSignatures)
        } catch (e) {
            reject(new Error(e.toString()))
        }
    })
}