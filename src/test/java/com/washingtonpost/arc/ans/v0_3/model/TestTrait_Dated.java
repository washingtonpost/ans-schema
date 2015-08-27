package com.washingtonpost.arc.ans.v0_3.model;

import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "trait_dated" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestTrait_Dated extends AbstractTest<TraitDated> {
    
    @Override
    String getSchemaName() {
        return "trait_dated";
    }

    @Override
    Class getTargetClass() {
        return TraitDated.class;
    }

    @Test
    public void testTraitDatedGood() throws Exception {
        testJsonValidation("trait-dated-fixture-good", true);
    }

    @Test
    public void testTraitDatedBadDateFormat() throws Exception {
        testJsonValidation("trait-dated-fixture-bad-date-format", false);
    }
}
