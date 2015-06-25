package com.washingtonpost.arc.ans.v0_2.model;

import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Taxonomy" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestTaxonomy extends AbstractTest {
    
    @Override
    String getSchemaName() {
        return "taxonomy";
    }

    @Test
    public void testTaxonomyGood() throws Exception {
        runTest("taxonomy-fixture-good", true);
    }
}
