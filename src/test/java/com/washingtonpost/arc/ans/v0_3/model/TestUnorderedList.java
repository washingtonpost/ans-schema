package com.washingtonpost.arc.ans.v0_3.model;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static junit.framework.Assert.assertTrue;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a blockquote serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestUnorderedList extends AbstractANSTest<UnorderedList> {

    @Override
    String getSchemaName() {
        return "ordered_list";
    }

    @Override
    Class getTargetClass() {
        return UnorderedList.class;
    }

    @Test
    public void testGoodSimple() throws Exception {
        testJsonValidation("ul-fixture-good", true);
        UnorderedList ul = testClassSerialization("ul-fixture-good");
        assertThat(ul.getId(), is("49876543210"));
        assertThat(ul.getType(), is("ul"));
        assertThat(ul.getItems().size(), is(3));
    }

    @Test
    public void testGoodNested() throws Exception {
        testJsonValidation("ul-fixture-good-nested", true);
        UnorderedList ul = testClassSerialization("ul-fixture-good-nested");
        assertThat(ul.getId(), is("49876543210"));
        assertThat(ul.getType(), is("ul"));
        assertThat(ul.getItems().size(), is(3));
        assertTrue(ul.getItems().get(2) instanceof UnorderedList);
        assertThat(((UnorderedList)ul.getItems().get(2)).getItems().size(), is(2));
    }


    @Test
    public void testBad() throws Exception {
        testJsonValidation("ul-fixture-bad", false);
    }

}
