package com.washingtonpost.arc.ans.v0_2.model;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a valid "Taxonomy" data file serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestTaxonomy extends AbstractTest<Taxonomy> {
    
    @Override
    String getSchemaName() {
        return "taxonomy";
    }

    @Override
    Class getTargetClass() {
        return Taxonomy.class;
    }

    @Test
    public void testTaxonomyGood() throws Exception {
        testJsonValidation("taxonomy-fixture-good", true);
        Taxonomy taxonomy = testClassSerialization("taxonomy-fixture-good");
        assertThat(taxonomy.getKeywords().size(), is(2));
        assertThat(taxonomy.getKeywords().get(1).getKeyword(), is("bar"));
        assertThat(taxonomy.getKeywords().get(1).getScore(), is(0.333));
        assertThat(taxonomy.getKeywords().get(1).getFrequency(), is(5));
    }
}
