package com.washingtonpost.arc.ans.v0_2.model;

import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "trait_guid" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestTrait_Guid extends AbstractTest<TraitGuid> {
    
    @Override
    String getSchemaName() {
        return "trait_guid";
    }

    @Override
    Class getTargetClass() {
        return TraitGuid.class;
    }

    @Test
    public void testTraitGuidGood() throws Exception {
        testJsonValidation("trait-guid-fixture-good", true);
    }

    @Test
    public void testTraitGuidBadMissingGuid() throws Exception {
        testJsonValidation("trait-guid-fixture-bad-missing-guid", false);
    }
}
