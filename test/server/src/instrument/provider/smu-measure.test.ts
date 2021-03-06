/*
 *  Copyright 2018 Tektronix Inc.
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
// tslint:disable:no-implicit-dependencies prefer-function-over-method
import { assert } from 'chai'
import { suite, test } from 'mocha-typescript'
import { ParameterInformation } from 'vscode-languageclient'

import { CommandDocumentation, FormattableSignatureInformation } from '../../../../../server/src/instrument/provider'
import * as Namespace from '../../../../../server/src/instrument/provider/smu-measure'
import { emptySpec } from '../emptySpec'

@suite class SmuMeasureTest {
    @test('CompletionDocs formatted properly')
    completionDocsFormattedProperly(): void {
        Namespace.completionDocs.forEach((value: CommandDocumentation, key: string) => {
            const docString = value.toString(emptySpec)

            const matches = docString.match(/%\{[0-9]+\}/)

            if (matches === null || matches.length > 0) {
                return
            }
            else {
                matches.forEach((matched: string) => {
                    assert(
                        false,
                        'Matched a replacement string "' + matched + '" from ' + key
                    )
                })

                return
            }
        })
    }

    @test('CompletionDocs formatter handles undefined')
    completionsDocsFormatterHandlesUndefined(): void {
        const undefinedMeasureRangeSpec = emptySpec
        undefinedMeasureRangeSpec.current.measure.range.default = undefined
        undefinedMeasureRangeSpec.voltage.measure.range.default = undefined
        undefinedMeasureRangeSpec.resistance.range.default = undefined

        Namespace.completionDocs.forEach((value: CommandDocumentation, key: string) => {
            const docString = value.toString(undefinedMeasureRangeSpec)

            if (key.localeCompare('smu.measure.range') !== 0) {
                return
            }

            const matches = docString.match(/(UNDEFINED)+/g)

            if (matches === null || matches.length === 0) {
                assert(
                    false,
                    'Failed to properly mark specification value as "UNDEFINED"'
                )
            }
            else {
                return
            }
        })
    }

    @test('Exports completionDocs')
    exportsCompletionDocs(): void {
        assert(
            Namespace.completionDocs !== undefined,
            'Expected Smu-Measure to export completionDocs'
        )
    }

    @test('Exports completions')
    exportsCompletions(): void {
        assert(
            Namespace.completions !== undefined,
            'Expected Smu-Measure to export completions'
        )
    }

    @test('Exports signatures')
    exportsSignatures(): void {
        assert(
            Namespace.signatures !== undefined,
            'Expected Smu-Measure to export signatures'
        )
    }

    @test('Signatures formatted properly')
    signaturesFormattedProperly(): void {
        Namespace.signatures.forEach((element: FormattableSignatureInformation) => {
            const formattedParams = element.getFormattedParameters(emptySpec)

            if (formattedParams.length === 0) {
                assert(true)

                return
            }

            formattedParams.forEach((value: ParameterInformation) => {
                if (value.documentation !== undefined) {
                    let docString: string

                    if (typeof value.documentation === 'string') {
                        docString = value.documentation
                    }
                    else if (typeof value.documentation === 'object') {
                        docString = value.documentation.value
                    }
                    else {
                        assert(
                            false,
                            'Unknown type for ParameterInformation.documentation: ' + typeof value.documentation
                        )

                        return
                    }

                    const matches = docString.match(/%\{[0-9]+\}/)

                    if (matches === null || matches.length > 0) {
                        return
                    }
                    else {
                        matches.forEach((matched: string) => {
                            assert(
                                false,
                                'Matched a replacement string "' + matched + '" from ' + element.label
                            )
                        })

                        return
                    }
                }
            })
        })
    }
}
