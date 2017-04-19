# Contributing to ANS

## Submitting a Proposal ##

If you wish to alter the schema of ANS in any substantive way, you must write a proposal describing the change that you wish to make. To write a proposal, do the following:

1. Branch or fork this repository.
2. Create a markdown document in the /docs/proposals/ directory with the date and title of your proposal. (E.g. "2017-05-01 - My Proposal.md")
3. Describe your proposal in the document. It should include:
   * The problem or use case that your proposal is trying to address.
   * A description of the change you are a proposing. More detail is better. If you are suggesting more than one field, then sub-sections may be warranted.
   * An example of an ANS document with your change in place.  (E.g., if you are suggesting a new field, your example should be a document with data in that field.)  Real-world examples are better than contrived ones.
   * Answers to any anticipated questions or concerns that your proposal might raise.
   * The name of the developer or team who will write the pull request for the schema change if your request is accepted.

An example proposal can be found here: [SAMPLE - 2017-04-19 - Recipe Element](https://github.com/washingtonpost/ans-schema/blob/master/docs/proposals/SAMPLE%20-%202017-04-19%20-%20Recipe%20Element.md)

Your proposed change should be "non-breaking" with respect to the current schema. (It should not remove or rename fields or objects.)

4. Once you are satisfied with your proposal, you should commit your document locally and submit a pull request to the master branch of this repository. (Your change should simply be the addition of your document to the /docs/proposals directory.)

5. Your proposal will be implemented if and only if your pull request is approved by representatives of all relevant departments at The Washington Post. (See "Accepting a Proposal" below.)

6. As questions arise about your proposal, you may change it and update your pull request. Discussion can happen in the github comments, the #ans slack channel, or offline, but all parties must approve of your proposal before it will be added to the schema.

7. Once your proposal is accepted by ALL of the teams below, the developer you named in your proposal, or someone else, should write the actual schema changes, complete with positive and negative tests and upverter logic.  These changes should also be submitted via a pull request.

## Accepting a Proposal

One representatives from each of the following groups at The Washington Post must ALL approve a proposal before it is considered accepted:

   * Platform Services (e.g. Timothy Kim, Gregory Engel)
   * Ellipsis (e.g. Eric Pascarello)
   * Site Team / Gregor (e.g. Matthew Jakes, Stephanie Clark)
   * Onboarding Team (e.g. Will Van Wazer)
   * Native Apps (e.g. Chad Moone, Vadim Gritsenko)

This list may change over time.

By approving a proposal, representatives for these groups indicate that their group is able to cope technically with any changes brought about by this schema change and that it can proceed at will. **There is no mechanism for "unaccepting" accepted proposals so make sure that your approval vote accurately speaks for your entire team before approving.**


## Previous Proposals

Proposals written and accepted using the old system will remain in the github issue tracker for this repository.

## Bug fixes, documentation updates, and other minor changes

Very minor changes may be committed directly to the master branch without going through any pull request.
