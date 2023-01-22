'use strict'
;(() => {
	/* Start of: BMG - Universal multistep forms script */

	// + Global strings +

	// Dependencies - make sure scripts don't load twice
	const gsapDependency = typeof gsap,
		gsapScrollToDependency = $('body').attr(
			'bmg-data-gsap-scroll-already-installed'
		),
		hammerJsDependency = typeof Hammer

	// Custom selectors
	const formBlockSelctor = '[bmg-form = "Form Block"]',
		formSelctor = '[bmg-form = "Form"]',
		stepSelctor = '[bmg-form = "Form Step"]',
		dividerSelctor = '[bmg-form = "Visual Divider"]',
		submitButtonSelector = '[bmg-form = "Submit Button"]',
		continueButtonSelector = '[bmg-form = "Continue Button"]',
		backwardsButtonSelector = '[bmg-form = "Backwards Button"]',
		notAButtonSelector = '[bmg-form = "Not a Button"]',
		quizResultSelector = '[bmg-form = "Quiz Result"]',
		progressBarSelector = '[bmg-form = "Progress Bar"]',
		anchorElementSelector = '[bmg-form = "Anchor Element"]'

	// Webflow classes
	const radioSelector = '.w-radio',
		checkboxSelector = '.w-checkbox',
		wButtonSelector = '.w-button',
		successSelector = '.w-form-done',
		conditionInvisibleSelector = '.w-condition-invisible'

	// Functional attributes
	const formBlockindexAttribute = 'bmg-data-form-block-index',
		stepIndexAttribute = 'bmg-data-step-index',
		stepTypeAttribute = 'bmg-data-step-type',
		stepRequiredAttribute = 'bmg-data-required',
		stepCustomRequirementsPassedAttribute =
			'bmg-data-custom-requirements-passed',
		relativeLastStepAttribute = 'bmg-data-relative-last-step',
		conditionalAttribute = 'bmg-data-conditional',
		conditionalNextAttribute = 'bmg-data-conditional-next',
		notAutoContinueAttribute = 'bmg-data-not-auto-continue',
		markClickElementAttribute = 'bmg-data-click-element',
		elementGotCheckedAttribute = 'bmg-data-element-checked',
		clickElementIdAttribute = 'bmg-data-click-element-id',
		removeOtherStepsAttribute = 'bmg-data-remove-other-steps',
		autoFocusAttribute = 'bmg-data-autofocus',
		keyboardEventsOnStepAttribute = 'bmg-data-keyboard-events',
		escEventAttribute = 'bmg-data-esc-event',
		enterEventAttribute = 'bmg-data-enter-event',
		leftEventAttribute = 'bmg-data-left-event',
		leftRightKeyEventInfinityAllowedAttribute =
			'bmg-data-left-key-event-infintiy-allowed',
		rightEventAttribute = 'bmg-data-right-event',
		devModeAttribute = 'bmg-data-dev-mode',
		swipeAllowedAttribute = 'bmg-data-swipe-allowed',
		quizPathAttribute = 'bmg-data-quiz-path',
		redirectUrlAttribute = 'bmg-data-redirect-url',
		autoDeleteConditionallyInvisibleItemsAttribute =
			'bmg-data-auto-delete-conditionally-invisible-elements',
		autoDetectNextStepAttribute = 'bmg-data-auto-detect-next-step'

	// Functional defaults
	const escEventDefault = 'escape, esc, arrowup, up',
		enterEventDefault = 'enter, arrowdown, down',
		leftEventDefault = 'arrowleft, left',
		rightEventDefault = 'arrowright, right',
		leftRightKeyEventInfinityAllowedDefault = 'true',
		autoDetectNextStepDefault = 'false'

	// Development mode object
	const devModeObject = [
		{
			names: ['false'],
			value: 0,
		},
		{
			names: ['half', '50%'],
			value: 0.5,
		},
		{
			names: ['on', 'true', '100%'],
			value: 1,
		},
		{
			names: ['extreme', '200%'],
			value: 2,
		},
	]

	// Style attributes
	const cssShowAttribute = 'bmg-data-css-show',
		cssHideAttribute = 'bmg-data-css-hide',
		cssActiveAttribute = 'bmg-data-css-active',
		cssInactiveAttribute = 'bmg-data-css-inactive',
		cssBackForthActiveAttribute = 'bmg-data-back-forth-css-active',
		cssBackForthInactiveAttribute = 'bmg-data-back-forth-css-inactive',
		setCssInactiveAttribute = 'bmg-data-set-css-inactive',
		cssSelectAttribute = 'bmg-data-css-select',
		cssDeselectAttribute = 'bmg-data-css-deselect',
		animationMsTimeAttribute = 'bmg-data-animation-ms-time',
		equalHeightTransitionSpeedMultiplierAttribute =
			'bmg-data-equal-height-transition-speed-multiplier',
		errorColorAttribute = 'bmg-data-error-color',
		cssErrorStatusAttribute = 'bmg-data-css-error-status',
		cssErrorStatusResolvedAttribute = 'bmg-data-css-error-status-resolved',
		slideDirectionAttribute = 'bmg-data-slide-direction',
		customNextSlideInAttribute = 'bmg-data-custom-next-slide-in',
		customNextSlideOutAttribute = 'bmg-data-custom-next-slide-out',
		customPrevSlideInAttribute = 'bmg-data-custom-prev-slide-in',
		customPrevSlideOutAttribute = 'bmg-data-custom-prev-slide-out',
		customXMultiplierAttribute = 'bmg-data-custom-x-percentage-multiplier',
		customYMultiplierAttribute = 'bmg-data-custom-y-percentage-multiplier',
		autoResizeTimeMultiplier1Attribute =
			'bmg-data-auto-resize-time-multiplier-1',
		autoResizeTimeMultiplier2Attribute =
			'bmg-data-auto-resize-time-multiplier-2',
		autoResizeSuccessTimeMultiplier1Attribute =
			'bmg-data-success-auto-resize-time-multiplier-1',
		autoResizeSuccessTimeMultiplier2Attribute =
			'bmg-data-success-auto-resize-time-multiplier-2',
		maxSwipeScreenSizeAttribute = 'bmg-data-max-swipe-screen-size',
		minSwipeScreenSizeAttribute = 'bmg-data-min-swipe-screen-size',
		swipeTypeAnimationAttribute = 'bmg-data-swipe-type-animation',
		submitMsTime1Attribute = 'bmg-data-submit-ms-time-1',
		submitMsTime2Attribute = 'bmg-data-submit-ms-time-2',
		submitShowAttribute = 'bmg-data-submit-show',
		submitHideAttribute = 'bmg-data-submit-hide',
		redirectMsTimeAttribute = 'bmg-data-redirect-ms-time',
		progressBarAnimationMsTimeAttribute = 'bmg-data-progress-bar-ms-time',
		progressBarAxisAttribute = 'bmg-data-progress-bar-axis',
		anchorMinScreenSizeAttribute = 'bmg-data-anchor-min-screen-size',
		anchorMaxScreenSizeAttribute = 'bmg-data-anchor-max-screen-size',
		anchorAnimationMsTimeAttribute = 'bmg-data-anchor-animation-ms-time',
		anchorYOffsetSelectorAttribute = 'bmg-data-anchor-y-offset-selector',
		anchorRelatedElementToScrollSelectorAttribute =
			'bmg-data-anchor-related-element-to-scroll-selector'

	// Style defaults
	const cssShowDefault = { opacity: 1, display: 'flex' },
		cssHideDefault = { opacity: 0, display: 'none' },
		cssActiveDefault = { opacity: 1, duration: 0.1 },
		cssInactiveDefault = { opacity: 0.5, duration: 0.1 },
		cssBackForthActiveDefault = { opacity: 1 },
		cssBackForthInactiveDefault = { opacity: 0.5 },
		animationMsTimeDefault = 500,
		equalHeightTransitionSpeedMultiplierDefault = 0.25,
		errorColorDefault = 'red',
		slideDirectionDefault = 'to left',
		customNextSlideInDefault = { ...cssShowDefault },
		customNextSlideOutDefault = { ...cssHideDefault },
		customPrevSlideInDefault = { ...cssShowDefault },
		customPrevSlideOutDefault = { ...cssHideDefault },
		customXMultiplierDefault = 0,
		customYMultiplierDefault = 0,
		autoResizeTimeMultiplier1Default = 1,
		autoResizeTimeMultiplier2Default = 0.5,
		autoResizeSuccessTimeMultiplier1Default = 1,
		autoResizeSuccessTimeMultiplier2Default = 0.85,
		maxSwipeScreenSizeDefault = 767,
		minSwipeScreenSizeDefault = 0,
		redirectMsTimeDefault = 1,
		progressBarAxisDefault = 'x',
		anchorMinScreenSizeDefault = 0,
		anchorMaxScreenSizeDefault = 767

	// Styles object
	let stylesObject = []

	/* --- --- --- Start of: Main --- --- --- */

	// + Main function +
	function main() {
		$(formBlockSelctor).each(function (formBlockIndex) {
			// - - Remove webflow invisible steps / items / elements - -
			if (
				$(this).attr(autoDeleteConditionallyInvisibleItemsAttribute) !=
				'false'
			) {
				$(this).find(conditionInvisibleSelector).remove()
			}

			// - - - Define base values - - -

			// Glocal elements
			let $formBlock = $(this),
				$form = returnChildElements($formBlock, formSelctor, 0),
				$steps = returnChildElements(
					$form,
					stepSelctor,
					'false',
					`${dividerSelctor}, ${quizResultSelector}`
				),
				$backwardsButtons = $form.find(backwardsButtonSelector),
				$submitButtons = $form.find(submitButtonSelector),
				$notForm = $formBlock.children().not($form),
				$backButton = $notForm.find(backwardsButtonSelector),
				$nextButton = $notForm.find(continueButtonSelector),
				backButtons = jqueryToJs($backButton),
				nextButtons = jqueryToJs($nextButton),
				$progressBar = $formBlock.find(progressBarSelector),
				progressBars = jqueryToJs($progressBar),
				$anchor = $formBlock.find(anchorElementSelector).eq(0)

			// Glocal variables
			let clickRecord = [{ step: 0 }],
				keyEventsAllowed = true

			// Glocal attributes
			let devMode = returnDevModeIndex($formBlock),
				autoDetectNextStep =
					($formBlock.attr(autoDetectNextStepAttribute) ||
						autoDetectNextStepDefault) == 'true'

			// - Styling -

			// Populate styles object
			populateStylesObject($formBlock)

			// Delete visual dividers
			if (devMode < 2) {
				// If dev mode is 200% or higher, do not:
				$form.find(dividerSelctor).remove()
				$steps.hide()
				$steps.eq(0).show()
			} else {
				console.log(
					`Dev mode ${devMode}: Visual dividers not removed...`
				)
			}

			// Inactivate back and forth buttons
			gsap.set([backButtons, nextButtons], {
				...stylesObject[formBlockIndex]['cssBackForthInactive'],
				duration: 0,
			})

			// - - - Glocal functions - - -

			// Save form block index in the DOM
			$formBlock.attr(formBlockindexAttribute, formBlockIndex)

			// - For each step - Find continue buttons -
			$steps.each(function (stepIndex) {
				// Local elments
				let $step = $(this),
					preventDoubleClick = false

				// Local functions

				// Define step types
				let $buttons = defineStepType($step, stepIndex, $formBlock) // Returns click elements

				// Init click elements
				markClickElement($buttons)

				// Define click actions
				$buttons.each(function (buttonIndex) {
					// Element
					let $button = $(this)

					// Help future code by indexing
					$button.attr(clickElementIdAttribute, buttonIndex)

					// Button click function
					$button.click(() => {
						// Prevent double clicking
						if (!preventDoubleClick) {
							setTimeout(() => {
								preventDoubleClick = false
							}, 10)

							// Call function
							markClickElement($buttons, $button)
							findNext()
						}

						preventDoubleClick = true
					})
				})
			})

			// - Backwards buttons -
			$backwardsButtons.add($backButton).each(function () {
				$(this).click(() => {
					goToPrevStep()
				})
			})

			// - Next button(s) -
			$nextButton.each(function () {
				$(this).click(() => {
					findNext(false, autoDetectNextStep)
				})
			})

			// - Update next button -
			function updateNextButton(stepId) {
				// Security return check
				if ($nextButton.length < 1) return

				// Elements
				let $step = $form.find(`[${stepIndexAttribute} = "${stepId}"]`),
					$clickedButton = $step.find(
						`[${markClickElementAttribute} = "true"]`
					)

				// Action logic
				if (
					$clickedButton.length > 0 &&
					stepRequirementsPassed($formBlock, $step)
				) {
					// If a clicked button exists
					gsap.to(
						nextButtons,
						stylesObject[formBlockIndex]['cssBackForthActive']
					)
				} else {
					gsap.to(
						nextButtons,
						stylesObject[formBlockIndex]['cssBackForthInactive']
					)
				}
			}

			// - Submit buttons -
			$submitButtons.each(function () {
				$(this).click(() => {
					submitForm()
				})
			})

			// - Create next step object -
			let stepLogicObject = creatNextStepObject($steps)

			// - Update progress bar -

			// Values
			let pbAnimationtime =
					stylesObject[formBlockIndex]['progressBarAnimationSTime'],
				pbAxis =
					stylesObject[formBlockIndex][
						'progressBarAxis'
					].toLowerCase()

			// Function
			function updateProgressBar(isSubmit = false) {
				// Security return check
				if ($progressBar.length < 1) return

				// Values
				let percentageFloat = isSubmit
					? 100
					: returnPathFloat('longest', clickRecord, stepLogicObject) // Return longest path

				// Axis logic
				if (['x', 'x, y', 'y, x'].includes(pbAxis)) {
					// X axis animation
					gsap.to(progressBars, {
						width: percentageFloat + '%',
						duration: pbAnimationtime,
					})
				}

				if (['y', 'x, y', 'y, x'].includes(pbAxis)) {
					// Y axis animation
					gsap.to(progressBars, {
						height: percentageFloat + '%',
						duration: pbAnimationtime,
					})
				}
			}
			updateProgressBar() // Initialize

			// - Anchor funcitonality -

			// Values
			let anchorMinScreenSize = parseInt(
					$anchor.attr(anchorMinScreenSizeAttribute) ||
						anchorMinScreenSizeDefault
				),
				anchorMaxScreenSize = parseInt(
					$anchor.attr(anchorMaxScreenSizeAttribute) ||
						anchorMaxScreenSizeDefault
				),
				anchorAnimationTime =
					stylesObject[formBlockIndex]['anchorAnimationSTime'],
				anchorYOffsetSelector = $anchor.attr(
					anchorYOffsetSelectorAttribute
				)

			// Elements
			let $anchorYOffset = $(anchorYOffsetSelector),
				anchorScrollTarget = document.querySelectorAll(
					$anchor.attr(anchorRelatedElementToScrollSelectorAttribute)
				)

			anchorScrollTarget =
				anchorScrollTarget.length > 0 ? anchorScrollTarget : window // Give webflower full customizability

			// Dom preperation
			$anchor.attr('id', `anchor-element-${formBlockIndex}`)

			// Function
			function anchorFunctionality() {
				if ($anchor.length == 1) {
					// Values
					let width = $(window).outerWidth(true),
						height = $anchorYOffset.outerHeight(true) || 0

					// If within specified scren size
					if (
						width <= anchorMaxScreenSize &&
						width >= anchorMinScreenSize
					) {
						gsap.to(anchorScrollTarget, {
							scrollTo: {
								y: `#anchor-element-${formBlockIndex}`,
								offsetY: height,
							},
							duration: anchorAnimationTime,
						})
					}
				}
			}

			// - Find next -
			function findNext(
				triggeredBySwipe = false,
				autoDetectNextStep = true
			) {
				// Variables
				let currentStepId = clickRecord[clickRecord.length - 1].step, // Get current click record entry
					object = stepLogicObject[currentStepId]

				// Prevent swipe gestures when turned off on step
				if (
					triggeredBySwipe &&
					object.swipeAllowed.toLowerCase() == 'false'
				) {
					return
				} // Check if swipe gesture is allowed in stepLogicObject

				// Elements
				let $currentStep = object.$, // find step with that id
					$clickedButton = $currentStep.find(
						`[${markClickElementAttribute} = "true"]`
					), // find button with got clicked attribute
					clickedButtonId = $clickedButton.attr(
						clickElementIdAttribute
					)

				// Logic
				if ($clickedButton.length == 1) {
					if (stepRequirementsPassed($formBlock, $currentStep)) {
						goToNextStep(currentStepId, clickedButtonId)
					}
				} else {
					// Select button number 1
					if (autoDetectNextStep)
						selectButton(0, $currentStep, $formBlock)

					// Update next button
					updateNextButton(currentStepId)
				}
			}

			// - Go to next step -
			function goToNextStep(stepIndex, buttonIndex) {
				// Variable
				let nextStepId =
					stepLogicObject[stepIndex].buttons[buttonIndex].nextStepId

				// Activate back button
				gsap.to(
					backButtons,
					stylesObject[formBlockIndex]['cssBackForthActive']
				)

				// Submit if last step
				if (stepLogicObject[stepIndex].isLast) {
					submitForm()
				} else {
					// Variables
					let $currentStep = stepLogicObject[stepIndex].$,
						$nextStep = stepLogicObject[nextStepId].$

					// Functions

					// Update click record
					clickRecord.push({ step: nextStepId })

					// Call transition animation
					animateStepTransition(
						$currentStep,
						$nextStep,
						$form,
						devMode
					)

					// Update next button
					updateNextButton(nextStepId)

					// Update progres bar
					updateProgressBar()

					// Perfomr anchor functionality
					anchorFunctionality()
				}

				// Dev mode
				if (devMode > 0.5) {
					console.log(
						`Dev mode ${devMode}; Click record: `,
						clickRecord
					)
				}
			}

			// - Go to prev step -
			function goToPrevStep(triggeredBySwipe = false) {
				// Variables
				let currentStepId = clickRecord[clickRecord.length - 1].step,
					prevStepId =
						clickRecord[Math.max(clickRecord.length - 2, 0)].step

				// Prevent swipe gestures when turned off on step
				if (
					triggeredBySwipe &&
					stepLogicObject[currentStepId].swipeAllowed.toLowerCase() ==
						'false'
				) {
					return
				}

				// Prevent going before first step
				if (currentStepId != prevStepId) {
					// Elements
					let $currentStep = $form.find(
							`[${stepIndexAttribute} = "${currentStepId}"]`
						),
						$prevStep = $form.find(
							`[${stepIndexAttribute} = "${prevStepId}"]`
						)

					// Functions
					clickRecord.pop() // Remove last element
					animateStepTransition(
						$currentStep,
						$prevStep,
						$form,
						devMode
					)
				}

				if (clickRecord.length <= 1 && $backButton.length > 0) {
					// Is approaching first step
					// Inactivate back button
					gsap.to(
						backButtons,
						stylesObject[formBlockIndex]['cssBackForthInactive']
					)
				}

				// Update next button
				updateNextButton(prevStepId)

				// Update progres bar
				updateProgressBar()

				// Perfomr anchor functionality
				anchorFunctionality()

				// Dev mode
				if (devMode > 0.5) {
					console.log(
						`Dev mode ${devMode}; Click record: `,
						clickRecord
					)
				}
			}

			// - - Submit Form - -
			function submitForm() {
				// - Requirement logic -

				// Variables
				let currentStepId = clickRecord[clickRecord.length - 1].step, // Get current click record entry
					object = stepLogicObject[currentStepId],
					$currentStep = object.$

				// Request
				if (!stepRequirementsPassed($formBlock, $currentStep)) {
					return false // Break
				}

				// Turn off keyboard form navigation
				keyEventsAllowed = false

				// Remove all steps that are not part of the click record before submitting
				removeOtherSteps(stepLogicObject, clickRecord, $formBlock)

				// Initialize quiz mode
				initQuizMode($formBlock, clickRecord)

				// Update progress bar
				updateProgressBar(true)

				// Hide back & next buttons
				gsap.to(
					[backButtons, nextButtons],
					stylesObject[formBlockIndex]['cssHide']
				)

				// Submit
				performVisualSubmit($formBlock, $form, devMode)
			}

			// - - Handle bmg autofocus & keyboard events - -

			// Initialize autofocus attribute on 1st form
			if (formBlockIndex == 0) {
				$formBlock.attr(autoFocusAttribute, true)
			}

			// Allow key board controls only on the recently clicked form
			$formBlock.mouseenter(() => {
				$(formBlockSelctor).attr(autoFocusAttribute, false)
				$formBlock.attr(autoFocusAttribute, true)
			})

			// Keyboard variables
			let escEvent = (
					$formBlock.attr(escEventAttribute) || escEventDefault
				).split(', '),
				enterEvent = (
					$formBlock.attr(enterEventAttribute) || enterEventDefault
				).split(', '),
				leftEvent = (
					$formBlock.attr(leftEventAttribute) || leftEventDefault
				).split(', '),
				rightEvent = (
					$formBlock.attr(rightEventAttribute) || rightEventDefault
				).split(', ')

			// - Initialize keyboard events -
			document.onkeydown = function (evt) {
				// Assign event
				evt = evt || window.event

				// Check if keyboard is turned off on current step
				let currentStepId = clickRecord[clickRecord.length - 1].step,
					$currentStep = $form.find(
						`[${stepIndexAttribute} = "${currentStepId}"]`
					)

				if (
					$currentStep.attr(keyboardEventsOnStepAttribute) == 'false'
				) {
					return
				}

				if (
					'key' in evt &&
					keyEventsAllowed &&
					$formBlock.attr(autoFocusAttribute) == 'true'
				) {
					// Variables
					let key = evt.key.toLowerCase()

					if (escEvent.includes(key)) {
						goToPrevStep()
					} else if (enterEvent.includes(key) && !evt.shiftKey) {
						// Only if shift is not pressed
						findNext()
					} else if (leftEvent.includes(key) && !evt.shiftKey) {
						// Only if shift is not pressed
						findNextButton(-1)
					} else if (rightEvent.includes(key) && !evt.shiftKey) {
						// Only if shift is not pressed
						findNextButton(1)
					}
				}
			}

			// - Select next button -
			let isInfinity =
				stylesObject[formBlockIndex][
					'leftRightKeyEventInfinityAllowed'
				] == 'true'
					? true
					: false

			function findNextButton(directionInt = 1) {
				// Variables
				let currentStepId = clickRecord[clickRecord.length - 1].step, // Get current click record entry
					object = stepLogicObject[currentStepId],
					$currentStep = object.$, // find step with that id
					buttonLength =
						$currentStep.find(`[${clickElementIdAttribute}]`)
							.length - 1,
					$clickedButton = $currentStep.find(
						`[${markClickElementAttribute} = "true"]`
					), // find button with got clicked attribute
					clickedButtonId = parseInt(
						$clickedButton.attr(clickElementIdAttribute) || -2
					),
					x =
						clickedButtonId == -2
							? 0
							: clickedButtonId + directionInt

				// Logic
				if (isInfinity) {
					x = x > buttonLength ? 0 : x
					x = x < 0 ? buttonLength : x
				} else {
					x = x > buttonLength ? buttonLength : x
					x = x < 0 ? 0 : x
				}

				// Action
				selectButton(x, $currentStep, $formBlock)
			}

			// - - Handle mobile swipe gestures - -

			// Init
			defineSwipeType($formBlock)

			// Variables
			let hammer = Hammer($formBlock[0]),
				animationType = $formBlock.attr(swipeTypeAnimationAttribute)

			// - Variations -
			if (animationType == 'false') {
			} else if (animationType == 'to bottom') {
				// Init all swipe directions
				hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL })

				hammer.on('swipeup', () => {
					goToPrevStep(true)
				})
				hammer.on('swipedown', () => {
					findNext(true)
				})
			} else if (
				animationType == 'to top' ||
				animationType == 'vertical'
			) {
				// Init all swipe directions
				hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL })

				hammer.on('swipeup', () => {
					findNext(true)
				})
				hammer.on('swipedown', () => {
					goToPrevStep(true)
				})
			} else if (
				animationType == 'to left' ||
				animationType == 'default' ||
				animationType == 'horizontal'
			) {
				hammer.on('swipeleft', () => {
					findNext(true)
				})
				hammer.on('swiperight', () => {
					goToPrevStep(true)
				})
			} else if (animationType == 'to right') {
				hammer.on('swipeleft', () => {
					goToPrevStep(true)
				})
				hammer.on('swiperight', () => {
					findNext(true)
				})
			} else if (animationType == '4' || animationType == '270°') {
				// Init all swipe directions
				hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL })

				hammer.on('swipeup', () => {
					goToPrevStep(true)
				})
				hammer.on('swipeleft', () => {
					findNext(true)
				})
				hammer.on('swiperight', () => {
					findNext(true)
				})
				hammer.on('swipedown', () => {
					goToPrevStep(true)
				})
			} else if (animationType == '3' || animationType == '180°') {
				// Init all swipe directions
				hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL })

				hammer.on('swipeup', () => {
					goToPrevStep(true)
				})
				hammer.on('swipeleft', () => {
					findNext(true)
				})
				hammer.on('swiperight', () => {
					findNext(true)
				})
				hammer.on('swipedown', () => {
					goToPrevStep(true)
				})
			} else if (animationType == '2' || animationType == '90°') {
				// Init all swipe directions
				hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL })

				hammer.on('swipeup', () => {
					goToPrevStep(true)
				})
				hammer.on('swipeleft', () => {
					findNext(true)
				})
				hammer.on('swiperight', () => {
					findNext(true)
				})
				hammer.on('swipedown', () => {
					goToPrevStep(true)
				})
			} // == 'none' || 1 || 'standard' || 0°
			else {
				// Init all swipe directions
				hammer.get('swipe').set({ direction: Hammer.DIRECTION_ALL })

				hammer.on('swipeup', () => {
					findNext(true)
				})
				hammer.on('swipeleft', () => {
					findNext(true)
				})
				hammer.on('swiperight', () => {
					goToPrevStep(true)
				})
				hammer.on('swipedown', () => {
					goToPrevStep(true)
				})
			}
		})
	}

	/* --- --- --- End of: Main --- --- --- */

	// + Helper functions +

	// - - Add error status - -
	function errorStatus(mode = 'add', $elements, styleIndex) {
		// Variables
		let styles = stylesObject[styleIndex],
			cssErrorStatus = styles['cssErrorStatus'],
			cssErrorStatusResolved = styles['cssErrorStatusResolved'],
			elements = jqueryToJs($elements)

		// Action
		if (mode == 'add') {
			gsap.to(elements, cssErrorStatus)
		} // mode == 'remove'
		else {
			gsap.to(elements, cssErrorStatusResolved)
		}
	}

	// - - check step requirments - -
	function stepRequirementsPassed($formBlock, $currentStep, mode = '100%') {
		// Variables
		let stepStype = $currentStep.attr(stepTypeAttribute),
			isRequired =
				($currentStep.attr(stepRequiredAttribute) || 'true') == 'true',
			styleIndex = parseInt($formBlock.attr(formBlockindexAttribute))

		// Required logic
		if (!isRequired) {
			return true
		}

		// Logic
		if (stepStype == 'empty') {
			return true
		} else if (stepStype == 'checkbox') {
			// Elements
			let $checkboxes = $currentStep.find(checkboxSelector)

			// Values
			let checkedBoxExists = false

			// Logic loop
			$checkboxes.each(function () {
				if ($(this).attr(elementGotCheckedAttribute) != undefined)
					checkedBoxExists = true
			})

			// Return result
			if (checkedBoxExists) {
				return true
			} else {
				// Throw error
				if (mode == '100%') errorStatus('add', $checkboxes, styleIndex)

				// Prevent double clicking
				if (mode == '100%') $checkboxes.off('click.stepRequirements')

				// Add clickevent
				if (mode == '100%')
					$checkboxes.on('click.stepRequirements', function () {
						// Remove error
						errorStatus('remove', $checkboxes, styleIndex)

						// Remove clickevent
						$checkboxes.off('click.stepRequirements')
					})

				// Return
				return false
			}
		} else if (stepStype == 'radio') {
			// Elements
			let $radios = $currentStep.find(radioSelector),
				$checked = $currentStep.find(`[${elementGotCheckedAttribute}]`),
				$buttons = $currentStep.find(`[${clickElementIdAttribute}]`)

			// If buttons equal radios return true
			if ($buttons.hasClass(radioSelector.substring(1))) {
				return true
			}

			// Logic
			if ($checked.length == 0) {
				// Throw error
				if (mode == '100%') errorStatus('add', $radios, styleIndex)

				// Prevent double clicking
				if (mode == '100%') $radios.off('click.stepRequirements')

				// Add clickevent
				if (mode == '100%')
					$radios.on('click.stepRequirements', function () {
						// Remove error
						errorStatus('remove', $radios, styleIndex)

						// Remove clickevent
						$radios.off('click.stepRequirements')
					})

				// Return
				return false
			} else {
				// Return
				return true
			}
		} else if (stepStype == 'custom') {
			// Values
			let requirementsPassed =
				$currentStep.attr(stepCustomRequirementsPassedAttribute) ||
				'false'

			// Logic
			if (requirementsPassed == 'false') {
				return false
			} // Requirements are passed
			else {
				return true
			}
		} // Other input types
		else {
			// Values
			let returnTrue = true

			// Elements
			let $inputs = $currentStep.find('input, select')

			// Reset
			if (mode == '100%') errorStatus('remove', $inputs, styleIndex)

			// Loop
			$inputs.each(function () {
				// Element
				let $input = $(this)

				// Logic
				if ($input.prop('required')) {
					if ($input.val() == '') {
						// Throw error
						returnTrue = false
						if (mode == '100%')
							errorStatus('add', $input, styleIndex)
					}
				}
			})

			// Logic
			if (returnTrue) {
				if (mode == '100%') errorStatus('remove', $inputs, styleIndex)
				return true
			} else {
				return false
			}
		}
	}

	// - - Select button x - -
	function selectButton(x, $step, $formBlock) {
		// Styles
		let styleObjectIndex = parseInt(
				$formBlock.attr(formBlockindexAttribute)
			),
			styles = stylesObject[styleObjectIndex],
			cssDeselect = styles['cssDeselect'],
			cssSelect = styles['cssSelect']

		// Elements
		let $buttons = $step.find(`[${clickElementIdAttribute}]`),
			buttons = jqueryToJs($buttons),
			$button = $step.find(`[${clickElementIdAttribute} = ${x}]`)

		// Actions
		markClickElement($buttons, $button)
		gsap.to(buttons, cssDeselect)
		gsap.to($button[0], cssSelect)
	}

	// - - Initialize Quizmode - -
	function initQuizMode($formBlock, clickRecord) {
		// Local elements
		let success = $formBlock[0].querySelector(successSelector),
			results = success.querySelectorAll(quizResultSelector)

		// Styles
		let styleObjectIndex = parseInt(
				$formBlock.attr(formBlockindexAttribute)
			),
			styles = stylesObject[styleObjectIndex],
			redirectMsTime = styles['redirectMsTime']

		// Run only if active
		if (results.length > 0) {
			console.log(results)

			// Vars & elements
			let defaultResult = results[0],
				defaultUrl = defaultResult.getAttribute(redirectUrlAttribute)

			// Url redirect logic
			if (defaultUrl != undefined) {
				setTimeout(() => {
					// Updated values
					defaultUrl =
						defaultResult.getAttribute(redirectUrlAttribute)

					// Action
					location.assign(defaultUrl)
				}, redirectMsTime)

				return
			}

			/*
        // Elements & vars
        let $defaultResult = $success.find(`[${ quizPathAttribute } = "default"]`).add( $results ).eq(0),
            defaultUrl = $defaultResult.attr('redirectUrlAttribute')

        console.log($success, $defaultResult, defaultUrl)

        // Url redirect logic
        if ( defaultUrl != undefined )
        {
            setTimeout(() => 
            {
                // Updated values
                defaultUrl = $defaultResult.attr('redirectUrlAttribute')

                // Action
                location.assign(defaultUrl)
            }, redirectMsTime)
            
            return
        } */

			// Local variables
			let hasNested, isUrl, hasUrlTimeElement

			// $success.find(`[${ quizPathAttribute } = "default"]`)

			// Continues logic. TODO:
			console.log(
				'Todo: Set up quiz mode funcitonality. Url functionality, nested forms, etc.'
			) // Control quizmode functionality.
		}
	}

	// - - Progress bar functions - -

	// - Return longest or shortest path -
	function returnPathFloat(mode, clickRecord, stepLogicObject) {
		// Values
		let latestRecordId = clickRecord[clickRecord.length - 1].step,
			clickRecordLength = clickRecord.length,
			min = stepLogicObject.length,
			max = 0,
			count = 0,
			tmpCount = 0,
			currentLoopIndex = 0,
			treeArray = []

		// Loop function
		function objectLoop(object) {
			// Values
			let array = returnNextStepIds(object)

			// Math
			count++
			tmpCount++

			// Handle multi steps logic
			if (array.length > 1) {
				// a tree split
				treeArray.push(tmpCount)
				tmpCount = 0
			}

			// Update values
			if (object.isLast) {
				// Update values
				max = Math.max(max, count)
				min = Math.min(min, count)
				count = 0

				// Add base value to tree
				treeArray.forEach(n => {
					count += n
				})

				// Trim back a leaf
				treeArray.pop()

				// Security conditional
				return
			}

			// Action loop
			array.forEach((id, index) => {
				// Iniciate loop
				objectLoop(stepLogicObject[id])
			})
		}

		// Return buttons
		function returnNextStepIds(object) {
			// Value
			let arr = []

			object.buttons.forEach(button => {
				if (arr.indexOf(button.nextStepId) === -1) {
					arr.push(button.nextStepId)
				}
			})

			// Return
			return arr
		}

		// Intiliaze loop
		objectLoop(stepLogicObject[latestRecordId])

		// Finetune math values
		min += clickRecordLength
		max += clickRecordLength

		// Logic
		if (mode == 'shortest') {
			let x = clickRecordLength / min
			return x * 100
		} else {
			let x = clickRecordLength / max
			return x * 100
		}
	}

	// - - Initialize Mobile Swipe gestures - -
	function defineSwipeType($element) {
		// Local variables
		let styleObjectIndex = parseInt($element.attr(formBlockindexAttribute)),
			type = $element.attr(swipeTypeAnimationAttribute),
			styles = stylesObject[styleObjectIndex],
			slideDirection = styles['slideDirection'].toLowerCase(),
			maxScreenSize = styles['maxSwipeScreenSize'],
			minScreenSize = styles['minSwipeScreenSize'],
			width = $(window).outerWidth(true)

		// Logic: Tell DOM the swipe type
		if (width <= maxScreenSize && width >= minScreenSize) {
			if (type != undefined) {
				slideDirection = type
			}
			$element.attr(swipeTypeAnimationAttribute, slideDirection)
		} else {
			$element.attr(swipeTypeAnimationAttribute, 'false')
		}
	}

	// - - Visual appealing submit - -
	function performVisualSubmit(
		$formBlock,
		$form,
		devMode = 0,
		clickRecord = []
	) {
		// Local variables
		let $success = $formBlock.find(successSelector),
			styleIndex = $formBlock.attr(formBlockindexAttribute),
			styles = stylesObject[styleIndex],
			time1 = styles['submitMsTime1'] / 1000,
			time2 = styles['submitMsTime2'] / 1000,
			submitHide = styles['submitHide'],
			submitHideQuick = { ...submitHide, duration: 0 }
		;(submitShow = styles['submitShow']),
			(resizeHeight1 = $form.outerHeight(true)),
			(resizeHeight2 = $success.outerHeight(true)),
			(multiplier1 = styles['autoResizeSuccessTimeMultiplier1']),
			(multiplier2 = styles['autoResizeSuccessTimeMultiplier2']),
			(submitTimeout =
				(submitHide.duration + submitShow.duration) * 1000),
			(tl = new gsap.timeline()),
			(resizeTl = new gsap.timeline())

		// Dev mode logic
		if (devMode < 0.5) {
			// If dev mode is half or higher, do not:
			setTimeout(() => {
				$form.submit()
			}, submitTimeout)
		} else {
			console.log(`Dev mode ${devMode}: Perform fake submit...`)
		}

		// - GSAP animations -

		// Animate submission transition
		tl.set($success[0], submitHideQuick)
		tl.to($form[0], submitHide)
		tl.to($success[0], submitShow)

		// Change frame height smoothly
		if (resizeHeight2 >= resizeHeight1) {
			resizeTl.to($formBlock[0], {
				height: resizeHeight2,
				duration: time1 * multiplier1,
			})
		} else {
			resizeTl.set($formBlock[0], { height: resizeHeight1 })
			resizeTl
				.to($formBlock[0], {
					height: resizeHeight2,
					duration: time2 * multiplier2,
				})
				.delay(time1)
		}
		resizeTl.set($formBlock[0], { height: 'auto' })
	}

	// - - Step transit animation - -

	// Timeline storage element
	let timeLineStorage = false

	// Function
	function animateStepTransition(
		$currentStep,
		$nextStep,
		$form,
		devMode = 0
	) {
		// Turn off animations on extreme dev mode
		if (devMode >= 2) {
			console.log(
				`Dev mode ${devMode}: Block the transition animation...`
			)
			return
		}

		// - Local variables -
		let $otherElements = $form
				.find(`[${stepIndexAttribute}]`)
				.not($currentStep)
				.not($nextStep),
			styleObjectIndex = parseInt(
				$form.closest(formBlockSelctor).attr(formBlockindexAttribute)
			),
			styles = stylesObject[styleObjectIndex],
			cssShow = styles['cssShow'],
			cssHide = styles['cssHide'],
			cssHideQuick = { ...cssHide, duration: 0 },
			tl = new gsap.timeline(),
			resizeHeight1 = $currentStep.outerHeight(true),
			resizeHeight2 = $nextStep.outerHeight(true),
			isEqualHeight = resizeHeight1 == resizeHeight2,
			speedMultiplier = isEqualHeight
				? styles['equalHeightTransitionSpeedMultiplier']
				: 1,
			speedMultiplierString = `<+=${speedMultiplier * 100}%`,
			isReverse =
				parseInt($currentStep.attr(stepIndexAttribute)) >
				parseInt($nextStep.attr(stepIndexAttribute)),
			slideDirection = (
				$currentStep.attr(slideDirectionAttribute) ||
				styles['slideDirection']
			).toLowerCase(),
			autoResizeTime1 = cssShow['duration'],
			autoResizeTime2 = cssHide['duration'],
			autoResizeTimeMultiplier1 = styles['autoResizeTimeMultiplier1'],
			autoResizeTimeMultiplier2 = styles['autoResizeTimeMultiplier2']

		// Step specific animation in reverse
		if (isReverse) {
			slideDirection = (
				$nextStep.attr(slideDirectionAttribute) || slideDirection
			).toLowerCase()
		}

		// Log speed multiplier info if dev mode = true
		if (devMode >= 2) {
			console.log(
				`Dev mode ${devMode}; GSAP transition speed multiplier string: ${speedMultiplierString}`
			)
		}

		// - Depending on slide Direction animate: -
		if (slideDirection == 'to bottom') {
			// Top to bottom
			// Local variables
			let fromTop = { ...cssShow, y: 0 },
				toTop = { ...cssHide, y: -$form.outerHeight(true) },
				toTopQuick = { ...toTop, duration: 0 },
				fromBottom = { ...cssShow, y: 0 },
				toBottom = { ...cssHide, y: $form.outerHeight(true) },
				toBottomQuick = { ...toBottom, duration: 0 }

			// Local logic
			if (!isReverse) {
				// Local functions
				tl.to($currentStep[0], toBottom)
				tl.fromTo(
					$nextStep[0],
					toTopQuick,
					fromTop,
					speedMultiplierString
				)
			} else {
				// Local functions
				tl.to($currentStep[0], toTop)
				tl.fromTo(
					$nextStep[0],
					toBottomQuick,
					fromBottom,
					speedMultiplierString
				)
			}
		} else if (slideDirection == 'to top') {
			// Bottom to top
			// Local variables
			let fromTop = { ...cssShow, y: 0 },
				toTop = { ...cssHide, y: -$form.outerHeight(true) },
				toTopQuick = { ...toTop, duration: 0 },
				fromBottom = { ...cssShow, y: 0 },
				toBottom = { ...cssHide, y: $form.outerHeight(true) },
				toBottomQuick = { ...toBottom, duration: 0 }

			// Local logic
			if (!isReverse) {
				// Local functions
				tl.to($currentStep[0], toTop)
				tl.fromTo(
					$nextStep[0],
					toBottomQuick,
					fromBottom,
					speedMultiplierString
				)
			} else {
				// Local functions
				tl.to($currentStep[0], toBottom)
				tl.fromTo(
					$nextStep[0],
					toTopQuick,
					fromTop,
					speedMultiplierString
				)
			}
		} else if (slideDirection == 'to left' || slideDirection == 'default') {
			// Right to left
			// Local variables
			let fromLeft = { ...cssShow, x: 0 },
				toLeft = { ...cssHide, x: -$form.outerWidth(true) },
				toLeftQuick = { ...toLeft, duration: 0 },
				fromRigth = { ...cssShow, x: 0 },
				toRigth = { ...cssHide, x: $form.outerWidth(true) },
				toRigthQuick = { ...toRigth, duration: 0 }

			// Local logic
			if (!isReverse) {
				// Local functions
				tl.to($currentStep[0], toLeft)
				tl.fromTo(
					$nextStep[0],
					toRigthQuick,
					fromRigth,
					speedMultiplierString
				)
			} else {
				// Local functions
				tl.to($currentStep[0], toRigth)
				tl.fromTo(
					$nextStep[0],
					toLeftQuick,
					fromLeft,
					speedMultiplierString
				)
			}
		} else if (slideDirection == 'to right') {
			// Left to right
			// Local variables
			let fromLeft = { ...cssShow, x: 0 },
				toLeft = { ...cssHide, x: -$form.outerWidth(true) },
				toLeftQuick = { ...toLeft, duration: 0 },
				fromRigth = { ...cssShow, x: 0 },
				toRigth = { ...cssHide, x: $form.outerWidth(true) },
				toRigthQuick = { ...toRigth, duration: 0 }

			// Local logic
			if (!isReverse) {
				// Local functions
				tl.to($currentStep[0], toRigth)
				tl.fromTo(
					$nextStep[0],
					toLeftQuick,
					fromLeft,
					speedMultiplierString
				)
			} else {
				// Local functions
				tl.to($currentStep[0], toLeft)
				tl.fromTo(
					$nextStep[0],
					toRigthQuick,
					fromRigth,
					speedMultiplierString
				)
			}
		} else if (slideDirection == 'none') {
			// None
			// Local functions
			tl.to($currentStep[0], cssHide)
			tl.fromTo($nextStep[0], cssHideQuick, cssShow)
		} // Custom
		else {
			// Local variables
			let customNextSlideIn = styles['customNextSlideIn'],
				customNextSlideOut = styles['customNextSlideOut'],
				customPrevSlideIn = styles['customPrevSlideIn'],
				customPrevSlideOut = styles['customPrevSlideOut'],
				xM = styles['customXMultiplier'],
				yM = styles['customYMultiplier']

			// Add possible x
			if (customNextSlideIn['x'] == undefined) {
				customNextSlideIn['x'] = 0
			}
			if (customNextSlideOut['x'] == undefined) {
				customNextSlideOut['x'] = xM * $form.outerWidth(true)
			}
			if (customPrevSlideIn['x'] == undefined) {
				customPrevSlideIn['x'] = 0
			}
			if (customPrevSlideOut['x'] == undefined) {
				customPrevSlideOut['x'] = -xM * $form.outerWidth(true)
			}

			// Add possible y
			if (customNextSlideIn['y'] == undefined) {
				customNextSlideIn['y'] = 0
			}
			if (customNextSlideOut['y'] == undefined) {
				customNextSlideOut['y'] = yM * $form.outerHeight(true)
			}
			if (customPrevSlideIn['y'] == undefined) {
				customPrevSlideIn['y'] = 0
			}
			if (customPrevSlideOut['y'] == undefined) {
				customPrevSlideOut['y'] = -yM * $form.outerHeight(true)
			}

			// Quick version
			let customPrevSlideOutQuick = {
					...customPrevSlideOut,
					duration: 0,
				},
				customNextSlideOutQuick = { ...customNextSlideOut, duration: 0 }

			// Local logic
			if (!isReverse) {
				// Set resize time value
				autoResizeTime1 = customNextSlideIn['duration']
				autoResizeTime2 = customNextSlideOut['duration']

				// Local functions
				tl.to($currentStep[0], customNextSlideOut)
				tl.fromTo(
					$nextStep[0],
					customPrevSlideOutQuick,
					customNextSlideIn,
					speedMultiplierString
				)
			} else {
				// Set resize time value
				autoResizeTime1 = customPrevSlideIn['duration']
				autoResizeTime2 = customPrevSlideOut['duration']

				// Local functions
				tl.to($currentStep[0], customPrevSlideOut)
				tl.fromTo(
					$nextStep[0],
					customNextSlideOutQuick,
					customPrevSlideIn,
					speedMultiplierString
				)
			}
		}

		// - Autoresize the form element; Depending on the 2 step sizes -
		if (resizeHeight2 >= resizeHeight1) {
			gsap.to($form[0], {
				height: resizeHeight2,
				duration: autoResizeTime1 * autoResizeTimeMultiplier1,
			})
		} else {
			gsap.set($form[0], { height: resizeHeight1 })
			gsap.to($form[0], {
				height: resizeHeight2,
				duration: autoResizeTime2 * autoResizeTimeMultiplier2,
			}).delay(autoResizeTime1)
		}

		// - Clear gsap timeline in case the form gets navigated quickly -
		if (timeLineStorage) timeLineStorage.clear()
		timeLineStorage = tl
		$otherElements.hide()
	}

	// - - Create next steps object - -
	function creatNextStepObject($steps) {
		// Local variables
		let stepsObject = []

		// Initialize stepsObject
		$steps.each(function (stepIndex) {
			// Local elements
			let $step = $(this),
				$buttons = $step.find(`[${clickElementIdAttribute}]`),
				buttonsObject = []

			$buttons.each(function () {
				// Element
				let $button = $(this)

				// Populate buttons object
				buttonsObject.push({
					id: $button.attr(clickElementIdAttribute),
					conditional: $button.attr(conditionalAttribute),
				})
			})

			// Populate steps object
			stepsObject.push({
				$: $step,
				step: stepIndex,
				swipeAllowed: $step.attr(swipeAllowedAttribute) || 'true',
				conditional: $step.attr(conditionalAttribute),
				conditionalNext: $step.attr(conditionalNextAttribute),
				buttons: buttonsObject,
			})
		})

		// Add logic to stepsObject
		let stepsCount = stepsObject.length

		stepsObject.forEach(step => {
			// Local val
			let stepIndex = step.step,
				relativeLast = step.$.attr(relativeLastStepAttribute)

			// Conditional last logic
			step.isLast = stepIndex == stepsCount - 1 ? true : false
			if (relativeLast == 'true') step.isLast = true

			// Next id logic
			step.buttons.forEach(button => {
				if (button.conditional != undefined) {
					button.nextStepId = (() => {
						for (step of stepsObject) {
							if (step.conditional == button.conditional) {
								return step.step
							}
						}
					})()
				} else if (step.conditionalNext != undefined) {
					button.nextStepId = stepIndex + 1
				} else {
					button.nextStepId = (() => {
						for (step of stepsObject) {
							if (
								step.step > stepIndex &&
								step.conditional == undefined
							) {
								return step.step
							}
						}
					})()
				}
			})
		})

		return stepsObject
	}

	function markClickElement($buttons, $button = false) {
		$buttons.attr(markClickElementAttribute, false)
		if ($button) {
			$button.attr(markClickElementAttribute, true)
		}
	}

	// - - Remove other steps - -
	function removeOtherSteps(stepObject, clickRecord, $element) {
		// Local variables
		let isAllowed = $element.attr(removeOtherStepsAttribute) || 'true',
			removeArray = []

		if (isAllowed == 'true') {
			stepObject.forEach(step => {
				let stepInRecord = false,
					stepIndex = step.step

				clickRecord.forEach(record => {
					if (stepIndex == record.step) {
						stepInRecord = true
					}
				})

				if (step.isLast) {
					stepInRecord = true
				}

				if (!stepInRecord) {
					step.$.remove()
				}
			})
		}
	}

	// - - Initialize click state for input fields - -
	function initActiveInactiveClickState(
		$elements,
		styleObjectIndex,
		$parent
	) {
		// Local variables
		let styles = stylesObject[styleObjectIndex],
			cssActive = styles['cssActive'],
			cssInactive = styles['cssInactive'],
			cssInactiveSet = styles['setCssInactive'],
			isRadio = $parent.attr(stepTypeAttribute) == 'radio' ? true : false,
			elements = jqueryToJs($elements)

		// Functions
		gsap.set(elements, cssInactiveSet) // Init

		if (isRadio) {
			$elements.each(function () {
				let $element = $(this)

				$element.click(() => {
					// Animation
					gsap.to(elements, cssInactive)
					gsap.to($element[0], cssActive)

					// Attributes
					$elements.removeAttr(elementGotCheckedAttribute)
					$element.attr(elementGotCheckedAttribute, true)
				})
			})
		} // Is checkbox
		else {
			$elements.each(function () {
				let $element = $(this),
					firstClick = true,
					preventDoubleClick = false

				// Skip element if that is specified
				if ($element.attr(cssActiveAttribute) == 'none') {
					return true
				}

				// Click event
				$element.click(() => {
					// Prevent double clicking
					if (!preventDoubleClick) {
						setTimeout(() => {
							preventDoubleClick = false
						}, 10)

						// Call checkbox click logic
						if (firstClick) {
							// Animation
							gsap.to($element[0], cssActive)

							// Attributes
							$element.attr(elementGotCheckedAttribute, true)

							// Logic
							firstClick = false // Int 2nd click
						} // Reset
						else {
							// Animation
							gsap.to($element[0], cssInactive)

							// Attributes
							$element.removeAttr(elementGotCheckedAttribute)

							// Logic
							firstClick = true
						}
					}

					preventDoubleClick = true
				})
			})
		}
	}

	// - - Define step type - -
	function defineStepType($step, stepIndex, $formBlock) {
		// Local elements
		let $radios = $step.find(radioSelector),
			$checkboxes = $step.find(checkboxSelector),
			$buttons = $step
				.find(`a, ${continueButtonSelector}, ${wButtonSelector}`)
				.not(notAButtonSelector)
				.not(backwardsButtonSelector),
			$inputs = $step.find('input'),
			formBlockIndex = parseInt($formBlock.attr(formBlockindexAttribute))

		// Set step index
		$step.attr(stepIndexAttribute, stepIndex)

		// Check for radio
		if ($radios.length > 0) {
			if ($step.attr(stepTypeAttribute) == undefined) {
				$step.attr(stepTypeAttribute, 'radio')
			}
			initActiveInactiveClickState($radios, formBlockIndex, $step)

			// Make sure to remove accidental radio requires
			$radios.find('input').removeAttr('required')

			return $step.attr(notAutoContinueAttribute) != undefined
				? $buttons
				: $radios
		}

		// Check for checkbox
		if ($checkboxes.length > 0) {
			if ($step.attr(stepTypeAttribute) == undefined) {
				$step.attr(stepTypeAttribute, 'checkbox')
			}
			initActiveInactiveClickState($checkboxes, formBlockIndex, $step)

			// Make sure to remove accidental checkbox requires (for full checkbox steps only)
			if ($step.attr(stepTypeAttribute) == 'checkbox') {
				$checkboxes.find('input').removeAttr('required')
			}

			return $buttons
		}

		// Check for checkbox
		if ($inputs.length > 0) {
			if ($step.attr(stepTypeAttribute) == undefined) {
				$step.attr(stepTypeAttribute, 'other input')
			}
			initActiveInactiveClickState($checkboxes, formBlockIndex, $step)

			return $buttons
		}

		// Else return empty
		if ($step.attr(stepTypeAttribute) == undefined)
			$step.attr(stepTypeAttribute, 'empty')

		return $buttons
	}

	// - - - Utils - - -

	// - - Return child elements - -
	function returnChildElements(
		$element,
		selector,
		eqValue = 'false',
		notSelector = 'false'
	) {
		let $foundElements = $element.find(selector),
			$childElements = $element.children()

		if ($foundElements.length > 0) {
			return $foundElements
		}

		if (notSelector != 'false') {
			$childElements = $childElements.not(notSelector)
		}

		if (eqValue != 'false') {
			$childElements = $childElements.eq(eqValue)
		}

		return $childElements
	}

	// - - Convert - -

	// jQuery to native JS
	function jqueryToJs($elements) {
		// Vars
		let nodeList = []

		$elements.each(function () {
			nodeList.push(this)
		})

		return nodeList
	}

	// - - String related functions - -

	// - Get attribute values -
	function getJsonAttrVals(
		$element,
		attribute,
		defaultVals,
		objectMode = true
	) {
		let val =
			($element.attr(attribute) || '{}') == '{}'
				? { ...defaultVals }
				: JSON.parse(preJsonParse($element.attr(attribute), true))

		return val
	}

	// - Prepare for JSON parse -
	function preJsonParse(string, objectMode = true) {
		let array = trimBothStringSides(string.replace(/\, /g, ',')).split(','),
			newString = '',
			arrayLength = array.length - 1

		array.forEach((item, i) => {
			item.replace(/\'/g, '')
				.replace(/\: /g, ':')
				.split(':')
				.forEach((item, i2) => {
					newString += `"${item}"${i2 > 0 ? '' : ': '}`
				})

			newString += i < arrayLength ? ', ' : ''
		})

		if (objectMode) {
			return `{${newString}}`
		} else {
			return newString
		}
	}

	// Removes curly brackets
	function trimBothStringSides(string) {
		return string.substring(1).slice(0, -1)
	}

	// - - Development mode - -
	function returnDevModeIndex($element) {
		// Local variables
		let attrString = $element.attr(devModeAttribute),
			returnValue = 0

		// Local function
		devModeObject.forEach(item => {
			// Loop through
			item.names.forEach(name => {
				if (name == attrString) {
					returnValue = item.value
				}
			})
		})

		return returnValue
	}

	// - - Populate styles object - -
	function populateStylesObject($element) {
		// Push initial values
		stylesObject.push({
			animationMsTime: parseFloat(
				$element.attr(animationMsTimeAttribute) ||
					animationMsTimeDefault
			),
			equalHeightTransitionSpeedMultiplier: parseFloat(
				$element.attr(equalHeightTransitionSpeedMultiplierAttribute) ||
					equalHeightTransitionSpeedMultiplierDefault
			),
			cssShow: getJsonAttrVals(
				$element,
				cssShowAttribute,
				cssShowDefault
			),
			cssHide: getJsonAttrVals(
				$element,
				cssHideAttribute,
				cssHideDefault
			),
			cssActive: getJsonAttrVals(
				$element,
				cssActiveAttribute,
				cssActiveDefault
			),
			cssInactive: getJsonAttrVals(
				$element,
				cssInactiveAttribute,
				cssInactiveDefault
			),
			cssBackForthActive: getJsonAttrVals(
				$element,
				cssBackForthActiveAttribute,
				cssBackForthActiveDefault
			),
			cssBackForthInactive: getJsonAttrVals(
				$element,
				cssBackForthInactiveAttribute,
				cssBackForthInactiveDefault
			),
			errorColor: $element.attr(errorColorAttribute) || errorColorDefault,
			slideDirection:
				$element.attr(slideDirectionAttribute) || slideDirectionDefault,
			customNextSlideIn: getJsonAttrVals(
				$element,
				customNextSlideInAttribute,
				customNextSlideInDefault
			),
			customNextSlideOut: getJsonAttrVals(
				$element,
				customNextSlideOutAttribute,
				customNextSlideOutDefault
			),
			customPrevSlideIn: getJsonAttrVals(
				$element,
				customPrevSlideInAttribute,
				customPrevSlideInDefault
			),
			customPrevSlideOut: getJsonAttrVals(
				$element,
				customPrevSlideOutAttribute,
				customPrevSlideOutDefault
			),
			customXMultiplier: parseFloat(
				$element.attr(customXMultiplierAttribute) ||
					customXMultiplierDefault
			),
			customYMultiplier: parseFloat(
				$element.attr(customYMultiplierAttribute) ||
					customYMultiplierDefault
			),
			autoResizeTimeMultiplier1: parseFloat(
				$element.attr(autoResizeTimeMultiplier1Attribute) ||
					autoResizeTimeMultiplier1Default
			),
			autoResizeTimeMultiplier2: parseFloat(
				$element.attr(autoResizeTimeMultiplier2Attribute) ||
					autoResizeTimeMultiplier2Default
			),
			autoResizeSuccessTimeMultiplier1: parseFloat(
				$element.attr(autoResizeSuccessTimeMultiplier1Attribute) ||
					autoResizeSuccessTimeMultiplier1Default
			),
			autoResizeSuccessTimeMultiplier2: parseFloat(
				$element.attr(autoResizeSuccessTimeMultiplier2Attribute) ||
					autoResizeSuccessTimeMultiplier2Default
			),
			maxSwipeScreenSize: parseInt(
				$element.attr(maxSwipeScreenSizeAttribute) ||
					maxSwipeScreenSizeDefault
			),
			minSwipeScreenSize: parseInt(
				$element.attr(minSwipeScreenSizeAttribute) ||
					minSwipeScreenSizeDefault
			),
			leftRightKeyEventInfinityAllowed:
				$element.attr(leftRightKeyEventInfinityAllowedAttribute) ||
				leftRightKeyEventInfinityAllowedDefault,
			redirectMsTime: parseFloat(
				$element.attr(redirectMsTimeAttribute) || redirectMsTimeDefault
			),
		})

		// Iterate over created object
		let styles = stylesObject[stylesObject.length - 1],
			cssShow = styles['cssShow'],
			cssHide = styles['cssHide'],
			cssBackForthActive = styles['cssBackForthActive'],
			cssBackForthInactive = styles['cssBackForthInactive'],
			cssActive = styles['cssActive'],
			cssInactive = styles['cssInactive'],
			customNextSlideIn = styles['customNextSlideIn'],
			customNextSlideOut = styles['customNextSlideOut'],
			customPrevSlideIn = styles['customPrevSlideIn'],
			customPrevSlideOut = styles['customPrevSlideOut']

		// Format time ms time
		styles['animationSTime'] = styles['animationMsTime'] / 1000

		// Set duration if not declared
		if (cssShow['duration'] == undefined) {
			cssShow['duration'] = styles['animationSTime']
		}
		if (cssHide['duration'] == undefined) {
			cssHide['duration'] = styles['animationSTime']
		}
		if (cssBackForthActive['duration'] == undefined) {
			cssBackForthActive['duration'] = styles['animationSTime']
		}
		if (cssBackForthInactive['duration'] == undefined) {
			cssBackForthInactive['duration'] = styles['animationSTime']
		}
		if (cssActive['duration'] == undefined) {
			cssActive['duration'] = styles['animationSTime']
		}
		if (cssInactive['duration'] == undefined) {
			cssInactive['duration'] = styles['animationSTime']
		}
		if (customNextSlideIn['duration'] == undefined) {
			customNextSlideIn['duration'] = styles['animationSTime']
		}
		if (customNextSlideOut['duration'] == undefined) {
			customNextSlideOut['duration'] = styles['animationSTime']
		}
		if (customPrevSlideIn['duration'] == undefined) {
			customPrevSlideIn['duration'] = styles['animationSTime']
		}
		if (customPrevSlideOut['duration'] == undefined) {
			customPrevSlideOut['duration'] = styles['animationSTime']
		}

		// Define submission time
		styles['submitMsTime1'] =
			parseFloat($element.attr(submitMsTime1Attribute)) ||
			styles['animationMsTime']
		styles['submitMsTime2'] =
			parseFloat($element.attr(submitMsTime2Attribute)) ||
			styles['animationMsTime']

		// Define submit animation type
		styles['submitHide'] = getJsonAttrVals(
			$element,
			submitHideAttribute,
			cssHide
		)
		styles['submitShow'] = getJsonAttrVals($element, submitShowAttribute, {
			...cssShow,
			duration: styles['animationSTime'] * 1.5,
		})

		if (styles['submitHide']['duration'] == undefined) {
			styles['submitHide']['duration'] = styles['submitMsTime1'] / 1000
		}
		if (styles['submitShow']['duration'] == undefined) {
			styles['submitShow']['duration'] = styles['submitMsTime2'] / 1000
		}

		// Set css inactive
		styles['setCssInactive'] = getJsonAttrVals(
			$element,
			setCssInactiveAttribute,
			cssInactive
		)
		delete styles['setCssInactive'].duration

		// Select / Deselect
		styles['cssSelect'] = getJsonAttrVals(
			$element,
			cssSelectAttribute,
			cssActive
		)
		styles['cssDeselect'] = getJsonAttrVals(
			$element,
			cssDeselectAttribute,
			cssInactive
		)

		// Error status CSS cssErrorStatusResolved
		styles['cssErrorStatus'] = getJsonAttrVals(
			$element,
			cssErrorStatusAttribute,
			{ duration: styles['animationSTime'] }
		)
		styles['cssErrorStatusResolved'] = getJsonAttrVals(
			$element,
			cssErrorStatusResolvedAttribute,
			{ duration: styles['animationSTime'] }
		)

		if (styles['cssErrorStatus']['borderColor'] == undefined) {
			styles['cssErrorStatus']['borderColor'] = styles['errorColor']
		}
		if (styles['cssErrorStatusResolved']['borderColor'] == undefined) {
			styles['cssErrorStatusResolved']['borderColor'] = ''
		}

		// Progress bar
		styles['progressBarAnimationSTime'] =
			parseFloat(
				$element.attr(progressBarAnimationMsTimeAttribute) ||
					styles['animationMsTime']
			) / 1000
		styles['progressBarAxis'] =
			$element.attr(progressBarAxisAttribute) || progressBarAxisDefault

		// Anchor functionality
		styles['anchorAnimationSTime'] =
			parseFloat(
				$element.attr(anchorAnimationMsTimeAttribute) ||
					styles['animationMsTime']
			) / 1000
	}

	// - - Loading related scripts - -

	// Allows for loading other scripts
	jQuery.loadScript = function (url, callback) {
		jQuery.ajax({
			url: url,
			dataType: 'script',
			success: callback,
			async: true,
		})
	}

	// Loader
	'undefined' == hammerJsDependency
		? $.loadScript(
				'https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js',
				function () {
					loadGsap()
				}
		  )
		: loadGsap()

	function loadGsap() {
		'undefined' == gsapDependency
			? $.loadScript(
					'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js',
					function () {
						loadGsapScrollTo()
					}
			  )
			: loadGsapScrollTo()
	}

	function loadGsapScrollTo() {
		undefined == gsapScrollToDependency
			? $.loadScript(
					'https://cdn.jsdelivr.net/gh/BarthMedia/js@main/ScrollToPlugin.min.js',
					function () {
						main()
					}
			  )
			: main()
	}
})() /* End of: BMG - Universal multistep forms script */
