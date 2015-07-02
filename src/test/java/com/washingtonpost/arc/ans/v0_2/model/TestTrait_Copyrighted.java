package com.washingtonpost.arc.ans.v0_2.model;

import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "trait_copyrighted" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestTrait_Copyrighted extends AbstractTest {
    
    @Override
    String getSchemaName() {
        return "trait_copyrighted";
    }

    @Test
    public void testTraitCopyrightedGood() throws Exception {
        runTest("trait-copyrighted-fixture-good", true);
    }
}
