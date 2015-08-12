package com.washingtonpost.arc.ans.v0_2.model;

import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "trait_copyrighted" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestTrait_Copyrighted extends AbstractTest<TraitCopyrighted> {
    
    @Override
    String getSchemaName() {
        return "trait_copyrighted";
    }

    @Override
    Class getTargetClass() {
        return TraitCopyrighted.class;
    }

    @Test
    public void testTraitCopyrightedGood() throws Exception {
        testJsonValidation("trait-copyrighted-fixture-good", true);
    }
}
