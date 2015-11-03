package com.washingtonpost.arc.ans.v0_3.model;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static junit.framework.Assert.assertTrue;
import org.junit.Test;

/**
 * <p>Tests that JSON we expect to be a blockquote serializes correctly and validates
 * against the JSON schema</p>
 */
public class TestList extends AbstractANSTest<ContentList> {

    @Override
    String getSchemaName() {
        return "list";
    }

    @Override
    Class getTargetClass() {
        return ContentList.class;
    }

    @Test
    public void testGoodSimple() throws Exception {
        testJsonValidation("ul-fixture-good", true);
        ContentList ul = testClassSerialization("ul-fixture-good");
        assertThat(ul.getId(), is("49876543210"));
        assertThat(ul.getType(), is("list"));
        assertThat(ul.getListType(), is("unordered"));
        assertThat(ul.getItems().size(), is(3));
    }

    @Test
    public void testGoodNested() throws Exception {
        testJsonValidation("ul-fixture-good-nested", true);
        ContentList ul = testClassSerialization("ul-fixture-good-nested");
        assertThat(ul.getId(), is("49876543210"));
        assertThat(ul.getType(), is("list"));
        assertThat(ul.getListType(), is("unordered"));
        assertThat(ul.getItems().size(), is(3));
        assertTrue(ul.getItems().get(2) instanceof ContentList);
        assertThat(((ContentList)ul.getItems().get(2)).getListType(), is("ordered"));
        assertThat(((ContentList)ul.getItems().get(2)).getItems().size(), is(2));
    }


    @Test
    public void testBad() throws Exception {
        testJsonValidation("ul-fixture-bad", false);
    }

}
